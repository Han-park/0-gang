export const getGuestbookContent = () => {
  return {
    ko: {
      title: "대장간 방명록",
      subtitle: "연락처를 제외한 내용이 대장간 웹사이트에 공개됩니다. 제출 후, 삭제를 원할 경우 대장간 멤버에게 알려주세요. 내용 수정은 대장간 커뮤니티 멤버십 가입 시 가능합니다.",
      selfieLabel: "셀피 촬영",
      nameLabel: "이름",
      messageLabel: "메시지",
      languageSelector: "선호하는 언어를 선택하세요",
      roleOrgLabel: "직책 / 소속",
      statusLabel: "현재 상태 (선택사항)",
      contactLabel: {
        phone: "전화번호",
        email: "이메일"
      },
      placeholders: {
        name: "박종한",
        roleOrg: "CFP 창업자/CEO",
        message: "방명록 메시지를 남겨주세요..",
        phone: "010-4167-0321",
        email: "me@han-park.info"
      },
      translationInfo: "번역된 내용을 확인하고 필요한 경우 수정하세요",
      reviewLabel: "입력 내용 확인",
      translateButtonText: "다시 번역하기",
      buttonText: {
        takePicture: "사진 촬영",
        retake: "다시 찍기",
        upload: "업로드",
        submit: "제출",
        back: "뒤로",
        next: "다음"
      },
      languages: {
        ko: "한국어",
        en: "영어"
      },
      statusOptions: [
        { value: "hiring", label: "채용중", color: "rgb(255, 239, 239)" },
        { value: "seeking_investment", label: "투자 유치 중", color: "rgb(255, 240, 226)" },
        { value: "seeking_cofounder", label: "코파운더 찾는 중", color: "rgb(255, 240, 157)" },
        { value: "seeking_ideas", label: "창업 아이디어 찾는 중", color: "rgb(221, 255, 221)" },
        { value: "developing_product", label: "제품 개발 중", color: "rgb(226, 240, 255)" },
        { value: "developing_customers", label: "고객 개발 중", color: "rgb(239, 226, 255)" }
      ],
      guestbookEntries: {
        loading: "방명록 불러오는 중...",
        error: "방명록을 불러오는 중 오류가 발생했습니다",
        noEntries: "아직 방명록이 없습니다",
        submitButton: "방명록 남기기",
        viewAll: "모든 방명록 보기"
      },
      thankYouMessage: "방명록을 남겨주셔서 감사합니다!",
      errorMessage: "문제가 발생했습니다. 다시 시도해주세요.",
      members: []
    },
    en: {
      title: "Blacksmiths Guestbook",
      subtitle: "Content excluding contact information will be publicly displayed on the Blacksmiths website. If you would like to delete your entry after submission, please notify a Blacksmiths member. Content can be edited upon joining the Blacksmiths community membership.",
      selfieLabel: "Take a Selfie",
      nameLabel: "Name",
      messageLabel: "Message",
      languageSelector: "Select your preferred language",
      roleOrgLabel: "Role / Organization",
      statusLabel: "Current Status (Optional)",
      contactLabel: {
        phone: "Phone",
        email: "Email"
      },
      placeholders: {
        name: "Jong-Han Park",
        roleOrg: "Founder/CEO of CFP",
        message: "Leave a message in our guestbook...",
        phone: "+82 10-4167-0321",
        email: "me@han-park.info"
      },
      translationInfo: "Review the translated content and edit if necessary",
      reviewLabel: "Review Your Entry",
      translateButtonText: "Translate Again",
      buttonText: {
        takePicture: "Take Picture",
        retake: "Retake",
        upload: "Upload",
        submit: "Submit",
        back: "Back",
        next: "Next"
      },
      languages: {
        ko: "Korean",
        en: "English"
      },
      statusOptions: [
        { value: "hiring", label: "Hiring", color: "rgb(255, 239, 239)" },
        { value: "seeking_investment", label: "Seeking Investment", color: "rgb(255, 240, 226)" },
        { value: "seeking_cofounder", label: "Looking for Co-founder", color: "rgb(255, 240, 157)" },
        { value: "seeking_ideas", label: "Looking for Startup Ideas", color: "rgb(221, 255, 221)" },
        { value: "developing_product", label: "Developing Product", color: "rgb(226, 240, 255)" },
        { value: "developing_customers", label: "Developing Customers", color: "rgb(239, 226, 255)" }
      ],
      guestbookEntries: {
        loading: "Loading guestbook entries...",
        error: "An error occurred while loading the guestbook",
        noEntries: "No guestbook entries yet",
        submitButton: "Sign the Guestbook",
        viewAll: "View All Entries"
      },
      thankYouMessage: "Thank you for leaving a message in our guestbook!",
      errorMessage: "There was a problem. Please try again.",
      members: []
    }
  };
}; 