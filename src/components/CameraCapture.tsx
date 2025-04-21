'use client';

import { useState, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface CameraCaptureProps {
  onCaptureComplete?: (imageUrl: string) => void;
  buttonText?: {
    takePicture: string;
    retake: string;
    upload: string;
  };
}

export default function CameraCapture({ 
  onCaptureComplete,
  buttonText = {
    takePicture: 'Take Picture',
    retake: 'Retake',
    upload: 'Upload'
  }
}: CameraCaptureProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('Cannot access camera. Please make sure camera permissions are enabled.');
      console.error('Error accessing camera:', err);
    }
  }, []);
  
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
  }, []);
  
  const takePicture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageDataUrl);
        stopCamera();
      }
    }
  }, [stopCamera]);
  
  const retakePicture = useCallback(() => {
    setCapturedImage(null);
    setError(null);
    startCamera();
  }, [startCamera]);
  
  const uploadImage = useCallback(async () => {
    if (!capturedImage) return;
    
    setIsUploading(true);
    setError(null);
    
    try {
      // Convert base64 to blob
      const res = await fetch(capturedImage);
      const blob = await res.blob();
      
      const fileName = `public/guestbook-${Date.now()}.jpg`;
      
      // Upload to Supabase
      const { data, error: uploadError } = await supabase.storage
        .from('guestbook-selfie')
        .upload(fileName, blob, {
          contentType: 'image/jpeg'
        });
      
      if (uploadError) {
        throw uploadError;
      }
      
      const { data: urlData } = supabase.storage
        .from('guestbook-selfie')
        .getPublicUrl(fileName);
      
      if (onCaptureComplete && urlData) {
        onCaptureComplete(urlData.publicUrl);
      }
      
      setCapturedImage(null);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }, [capturedImage, onCaptureComplete]);
  
  return (
    <div className="w-full max-w-md mx-auto">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="relative w-full aspect-square bg-black rounded-lg overflow-hidden">
        {capturedImage ? (
          <img 
            src={capturedImage} 
            alt="Captured" 
            className="w-full h-full object-cover"
          />
        ) : (
          <video 
            ref={videoRef}
            autoPlay 
            playsInline
            muted
            className="w-full h-full object-cover"
            onLoadedMetadata={() => {
              if (videoRef.current) {
                videoRef.current.play();
              }
            }}
          />
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
      
      <div className="flex gap-2 mt-4">
        {!capturedImage ? (
          <button
            type="button"
            onClick={() => {
              if (streamRef.current) {
                takePicture();
              } else {
                startCamera();
              }
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            {buttonText.takePicture}
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={retakePicture}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
              disabled={isUploading}
            >
              {buttonText.retake}
            </button>
            <button
              type="button"
              onClick={uploadImage}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : buttonText.upload}
            </button>
          </>
        )}
      </div>
    </div>
  );
} 