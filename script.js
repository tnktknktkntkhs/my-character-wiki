// =========================================
// Firebaseの初期設定
// =========================================
const firebaseConfig = {
    apiKey: "AIzaSyC7aCynBtuayjTU3ODcghjqLkIVtjXB3O8",
    authDomain: "my-char-db.firebaseapp.com",
    projectId: "my-char-db",
    storageBucket: "my-char-db.firebasestorage.app",
    messagingSenderId: "822787330308",
    appId: "1:822787330308:web:aa8f630ba4f3f4f4fb8051"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); 
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
let currentPageAuthorId = null;

// =========================================
// 多言語対応（i18n）の辞書（絵文字なし・クリーン設計）
// =========================================
const translations = {
    ja: {
        "header.notLoggedIn": "閲覧モード",
        "header.pleaseLogin": "ログインしてください",
        "header.loggedIn": "ログイン中",
        "header.publish": "ネットに保存",
        "header.googleLogin": "Googleでログイン",
        "header.myPage": "マイページ",
        "header.noMyPage": "まだページがありません。「新しいページを作成する」から作成してください。",
        "header.myPageFailed": "マイページを開けませんでした。もう一度お試しください。",
        "header.pageAlreadyExists": "すでにあなたのページが存在します。マイページを開きます。",
        "ai.notDeployed": "AIの関数がサーバーに見つかりません。",
        "ai.unknownError": "AIから応答を受け取れませんでした",
        "ai.errorPrefix": "通信エラーが発生しました: ",
        "header.logout": "ログアウト",
        "header.switchAccount": "アカウント切替",
        "header.switchAccountFailed": "アカウントの切り替えに失敗しました。",
        "sidebar.title": "メニュー",
        "sidebar.home": "ホーム / ギャラリー",
        "sidebar.homeShort": "ホーム",
        "sidebar.characters": "キャラクター図鑑",
        "sidebar.charShort": "図鑑",
        "sidebar.lore": "世界観・用語事典",
        "sidebar.loreShort": "事典",
        "sidebar.novel": "小説・ストーリー",
        "sidebar.novelShort": "小説",
        "portal.newsTitle": "\\ うちよそ管理サイトからのお知らせ /",
        "portal.newsLoading": "お知らせを読み込み中...",
        "portal.noNewsYet": "現在、お知らせはありません。",
        "portal.editNewsBtn": "[管理者] お知らせ編集",
        "portal.editNewsTitle": "お知らせの編集（管理者モード）",
        "portal.newsPlaceholder": "お知らせ内容を入力してください...",
        "portal.saveNews": "お知らせを保存",
        "portal.newPagePrompt": "新しいページを作り始めますか？",
        "portal.createPageBtn": "＋ 新しいページを作成する",
        "portal.creatorListTitle": "クリエイター一覧",
        "portal.creatorListHint": "名前にマウスを乗せると、各作者のマイページへ行けます！",
        "portal.adminLogin": "[管理者モードでログイン]",
        "profile.editBtn": "プロフィール編集",
        "profile.nameLabel": "作者名",
        "profile.namePlaceholder": "作者名（ニックネーム）",
        "profile.bioLabel": "自己紹介",
        "profile.bioPlaceholder": "推し傾向、地雷、固定メンバーへの一言など",
        "profile.snsLabel": "主要SNS（空欄でOK）",
        "profile.extraLinksLabel": "その他の外部リンク（自由に追加）",
        "profile.linkNamePlaceholder": "リンク名（例: 個人サイト）",
        "common.urlPlaceholder": "https://...",
        "common.addToList": "＋ リストに追加",
        "common.save": "保存する",
        "common.cancel": "キャンセル",
        "common.close": "閉じる",
        "common.search": "検索",
        "common.addLinkToList": "＋ リンクを追加",
        "common.addRelation": "＋ 関係性を追加",
        "home.galleryTitle": "ギャラリー",
        "home.introText": "登録キャラクターや世界観設定、関連イラストをまとめたページです。",
        "home.galleryManageTitle": "ギャラリー画像の管理",
        "home.galleryManageDesc": "ホーム画面の最上部に流す、自慢の一枚絵を追加・削除・並び替えできます。",
        "home.galleryTitlePlaceholder": "画像のタイトル（例: 集合絵、立ち絵など）",
        "home.addImageBtn": "画像を追加",
        "home.registeredImagesLabel": "登録済み画像一覧:",
        "char.pageTitle": "キャラクター図鑑",
        "char.advancedSearchBtn": "詳細絞り込み（世界線・タグ）",
        "char.randomPickBtn": "[!] 今日描くキャラを抽選",
        "char.worldSearchPlaceholder": "世界線で検索",
        "char.worldPickLabel": "世界線から選ぶ:",
        "char.tagPickLabel": "タグから選ぶ:",
        "trash.title": "ゴミ箱（30日間保管後に完全削除されます）",
        "trash.empty": "ゴミ箱は空です。",
        "char.sortNew": "新しい順",
        "char.sortOld": "古い順",
        "char.sortName": "名前順",
        "char.sortFavorite": "★ お気に入り順",
        "char.fullscreenBtn": "大画面",
        "char.backupSaveBtn": "バックアップ保存",
        "char.backupLoadBtn": "バックアップ読込",
        "char.pasteImportTitle": "他サイトからコピペでインポート:",
        "char.pasteImportPlaceholder": "ここにデータをCtrl+V（貼り付け）してね",
        "char.parseImportBtn": "データを解析して図鑑に追加する",
        "char.jsonImportTitle": "他サイトのデータ（JSONファイル）をインポート:",
        "char.worldPlaceholder": "例: ファンタジー、学園",
        "char.groupPlaceholder": "組織・ユニット（例: 暗殺組織、警察など）",
        "char.tagPlaceholder": "主人公, 剣士, クール",
        "char.namePlaceholder": "名前",
        "char.furiganaPlaceholder": "ふりがな",
        "char.personalityPlaceholder": "性格",
        "char.occupationPlaceholder": "職業・肩書き",
        "char.labelWorld": "世界線:",
        "char.labelTag": "タグ:",
        "char.labelOccupation": "職業:",
        "char.labelPersonality": "性格:",
        "char.labelBirthday": "誕生日:",
        "char.labelRelations": "関係性:",
        "char.birthdayPlaceholder": "例: 3月14日 / 3/14",
        "char.favColorLabel": "推し色・イメージカラー:",
        "char.linksLabel": "関連リンク",
        "char.linkTitlePlaceholder": "リンク先タイトル",
        "char.themeVideoLabel": "イメソン・テーマ動画（YouTube）",
        "char.addVideoBtn": "＋ 動画URLを追加",
        "char.memoLabel": "メモ・詳細設定",
        "char.addMemoBtn": "＋ 新しいメモ枠を追加",
        "char.aiStoryBtn": "AIにバックストーリーを執筆してもらう",
        "char.relationsLabel": "関係性の追加",
        "char.relationTitlePlaceholder": "例: 相棒、ライバル、片思い",
        "char.costumeLabel": "衣装・立ち絵の登録（メインも別衣装もここから！）",
        "char.costumeNamePlaceholder": "衣装名（例：メイン、制服、幼少期）",
        "char.addCostumeBtn": "＋ 衣装をリストに追加",
        "char.submitBtn": "キャラクターを追加・更新",
        "char.thumbPositionLabel": "カードでのサムネイル表示位置（トリミング）:",
        "char.thumbTop": "上（顔を優先）",
        "char.thumbCenter": "真ん中（全体を優先）",
        "char.thumbBottom": "下（足元を優先）",
        "novel.pageTitle": "小説・ストーリー管理",
        "novel.worldLabel": "世界線:",
        "novel.groupLabel": "組織・ユニット:",
        "novel.charLabel": "キャラクター:",
        "novel.seriesLabel": "選択中の作品（シリーズ）:",
        "novel.newSeriesBtn": "＋ 新作シリーズを作る",
        "novel.deleteSeriesBtn": "× シリーズ削除",
        "novel.episodesLabel": "エピソード（話数）一覧:",
        "novel.newEpisodeBtn": "＋ 新しい話を追加",
        "novel.deleteEpisodeBtn": "× この話を削除",
        "novel.subtitleLabel": "サブタイトル / 話のタイトル:",
        "novel.episodeTitlePlaceholder": "例：第1話 雨の日の放課後",
        "novel.aiDesc": "このキャラクター・状況に応じた小説をAIに執筆させます。",
        "novel.themePlaceholder": "どんなシチュエーションにする？",
        "novel.aiWriteBtn": "AI執筆",
        "novel.theaterLabel": "本文執筆・閲覧シアター:",
        "novel.outputPlaceholder": "ここに物語が紡がれます...",
        "novel.renameSeriesBtn": "シリーズ名変更",
        "novel.renamePrompt": "新しいシリーズ名を入力してください：",
        "novel.overviewTitle": "最近のシリーズ",
        "novel.overviewEmpty": "まだシリーズがありません。キャラクターを選んで新作シリーズを作りましょう。",
        "novel.episodeUnit": "話",
        "novel.saved": "保存しました！",
        "novel.savedLocalOnly": "この端末に保存しました。ネットへの反映は上の「ネットに保存」を押してください。",
        "novel.saveBtn": "この話を保存する",
        "char.formFab": "入力",
        "char.formClose": "しまう",
        "char.fullscreenClose": "× 閉じる",
        "common.language": "言語",
        "birthday.congrats": "お誕生日おめでとうございます！",
        "js.editMode": "",
        "js.viewMode": "閲覧モード",
        "char.openDetailPage": "キャラクターを個別にみる",
        "char.backBtn": "← 戻る",
        "char.detailGalleryTitle": "キャラクターギャラリー",
        "char.detailGalleryEmpty": "まだギャラリー画像が登録されていません。",
        "char.galleryUploadLabel": "キャラ個別ギャラリー",
        "char.galleryTitlePlaceholder": "画像のタイトル（任意）",
        "char.addGalleryImageBtn": "＋ ギャラリーに追加",
        "js.previewMode": "プレビュー中",
        "js.previewAsVisitor": "閲覧者として見る",
        "js.backToEdit": "編集に戻る",
        "settings.title": "サイトの公開設定",
        "settings.pageVisibilityLabel": "あなたのページの公開範囲",
        "settings.public": "全体公開（スタートページの一覧に表示される）",
        "settings.unlisted": "限定公開（URLを知っている人だけが見られる。一覧には出ない）",
        "settings.saved": "設定を保存しました",
        "settings.saveFailed": "設定の保存に失敗しました",
        "portal.noCreatorsYet": "まだ登録されている作者はいません。ログインしてプロフィールを登録すると、ここに自動で表示されます！",
        "portal.needLoginToCreate": "ページの作成にはログインが必要です！",
        "portal.createPageFailed": "ページの作成に失敗しました。",
        "char.isPublicLabel": "このキャラクターを公開する（チェックを外すと自分にしか見えない非公開状態になります）",
        "char.privateBadge": "非公開",
        "js.worldless": "世界線なし",
        "js.all": "全部",
        "js.detailOpen": "+ 詳細",
        "js.detailClose": "- 詳細",
        "js.edit": "編集",
        "js.delete": "削除",
        "js.favoriteOn": "★ 解除",
        "js.favoriteOff": "☆ お気に入り",
        "js.trashBtn": "ゴミ箱",
        "js.restoreBtn": "元に戻す",
        "js.permaDeleteBtn": "完全削除",
        "js.unregisteredCreator": "未登録のクリエイター",
        "js.noBioYet": "自己紹介はまだありません。"
    },
    en: {
        "header.notLoggedIn": "View Mode",
        "header.pleaseLogin": "Please log in",
        "header.loggedIn": "Logged in",
        "header.publish": "Save Online",
        "header.googleLogin": "Sign in with Google",
        "header.myPage": "My Page",
        "header.noMyPage": "You don't have a page yet. Click 'Create a New Page' to get started.",
        "header.myPageFailed": "Failed to open My Page. Please try again.",
        "header.pageAlreadyExists": "You already have a page. Opening My Page.",
        "ai.notDeployed": "AI function was not found on the server.",
        "ai.unknownError": "Failed to receive a response from the AI.",
        "ai.errorPrefix": "A connection error occurred: ",
        "header.logout": "Log Out",
        "header.switchAccount": "Switch Account",
        "header.switchAccountFailed": "Failed to switch accounts.",
        "sidebar.title": "Menu",
        "sidebar.home": "Home / Gallery",
        "sidebar.homeShort": "Home",
        "sidebar.characters": "Character Directory",
        "sidebar.charShort": "Chars",
        "sidebar.lore": "Lore & Glossary",
        "sidebar.loreShort": "Lore",
        "sidebar.novel": "Novels & Stories",
        "sidebar.novelShort": "Stories",
        "portal.newsTitle": "\\ Announcements from the OC Hub /",
        "portal.newsLoading": "Loading announcements...",
        "portal.noNewsYet": "No announcements at the moment.",
        "portal.editNewsBtn": "[Admin] Edit Announcements",
        "portal.editNewsTitle": "Edit Announcements (Admin Mode)",
        "portal.newsPlaceholder": "Enter announcement details...",
        "portal.saveNews": "Save Announcement",
        "portal.newPagePrompt": "Ready to start creating a new page?",
        "portal.createPageBtn": "+ Create a New Page",
        "portal.creatorListTitle": "Creator List",
        "portal.creatorListHint": "Hover over a name to visit that creator's page!",
        "portal.adminLogin": "[Log in as Admin]",
        "profile.editBtn": "Edit Profile",
        "profile.nameLabel": "Creator Name",
        "profile.namePlaceholder": "Creator Name (Nickname)",
        "profile.bioLabel": "Bio",
        "profile.bioPlaceholder": "Favorite tropes, dislikes/triggers, a note to co-creators, etc.",
        "profile.snsLabel": "Main Socials (Optional)",
        "profile.extraLinksLabel": "Other External Links (Add freely)",
        "profile.linkNamePlaceholder": "Link Title (e.g., Personal Site)",
        "common.urlPlaceholder": "https://...",
        "common.addToList": "+ Add to List",
        "common.save": "Save",
        "common.cancel": "Cancel",
        "common.close": "Close",
        "common.search": "Search",
        "common.addLinkToList": "+ Add Link",
        "common.addRelation": "+ Add Relationship",
        "home.galleryTitle": "Gallery",
        "home.introText": "An archive of characters, worldbuilding notes, and illustrations.",
        "home.galleryManageTitle": "Manage Gallery Images",
        "home.galleryManageDesc": "Add, remove, or reorder your favorite illustrations displayed at the top of your Home screen.",
        "home.galleryTitlePlaceholder": "Image Title (e.g., Group Art, Character Sheet)",
        "home.addImageBtn": "Add Image",
        "home.registeredImagesLabel": "Registered Images:",
        "char.pageTitle": "Character Directory",
        "char.advancedSearchBtn": "Advanced Filter (World / Tags)",
        "char.randomPickBtn": "[!] Pick Today's Character to Draw",
        "char.worldSearchPlaceholder": "Search by worldline",
        "char.worldPickLabel": "Filter by Worldline:",
        "char.tagPickLabel": "Filter by Tag:",
        "trash.title": "Trash (Permanently deleted after 30 days)",
        "trash.empty": "Trash is empty.",
        "char.sortNew": "Newest First",
        "char.sortOld": "Oldest First",
        "char.sortName": "By Name",
        "char.sortFavorite": "★ Favorites First",
        "char.fullscreenBtn": "Fullscreen",
        "char.backupSaveBtn": "Save Backup",
        "char.backupLoadBtn": "Load Backup",
        "char.pasteImportTitle": "Import via Copy & Paste from Other Sites:",
        "char.pasteImportPlaceholder": "Press Ctrl+V (Paste) your data here",
        "char.parseImportBtn": "Parse Data & Add to Directory",
        "char.jsonImportTitle": "Import Data (JSON File) from Other Sites:",
        "char.worldPlaceholder": "e.g., Fantasy, School",
        "char.groupPlaceholder": "Organization / Unit (e.g., Guild, Police)",
        "char.tagPlaceholder": "Protagonist, Swordsman, Cool",
        "char.namePlaceholder": "Name",
        "char.furiganaPlaceholder": "Phonetic Reading / Sub-name",
        "char.personalityPlaceholder": "Personality",
        "char.occupationPlaceholder": "Occupation / Title",
        "char.labelWorld": "Worldline:",
        "char.labelTag": "Tags:",
        "char.labelOccupation": "Occupation:",
        "char.labelPersonality": "Personality:",
        "char.labelBirthday": "Birthday:",
        "char.labelRelations": "Relationships:",
        "char.birthdayPlaceholder": "e.g., March 14 / 3/14",
        "char.favColorLabel": "Theme Color:",
        "char.linksLabel": "Related Links",
        "char.linkTitlePlaceholder": "Link Title",
        "char.themeVideoLabel": "Theme Song / Video (YouTube)",
        "char.addVideoBtn": "+ Add Video URL",
        "char.memoLabel": "Notes & Detailed Profile",
        "char.addMemoBtn": "+ Add New Note Field",
        "char.aiStoryBtn": "Generate Backstory with AI",
        "char.relationsLabel": "Add Relationship",
        "char.relationTitlePlaceholder": "e.g., Partner, Rival, Unrequited Love",
        "char.costumeLabel": "Outfits & Character Art (Register main & alternate outfits here!)",
        "char.costumeNamePlaceholder": "Outfit Name (e.g., Main, Uniform, Childhood)",
        "char.addCostumeBtn": "+ Add Outfit to List",
        "char.submitBtn": "Add / Update Character",
        "char.thumbPositionLabel": "Card Thumbnail Crop Position:",
        "char.thumbTop": "Top (Focus on face)",
        "char.thumbCenter": "Center (Focus on full body)",
        "char.thumbBottom": "Bottom (Focus on feet)",
        "novel.pageTitle": "Novels & Stories",
        "novel.worldLabel": "Worldline:",
        "novel.groupLabel": "Organization / Unit:",
        "novel.charLabel": "Character:",
        "novel.seriesLabel": "Selected Series:",
        "novel.newSeriesBtn": "+ New Series",
        "novel.deleteSeriesBtn": "× Delete Series",
        "novel.episodesLabel": "Episodes / Chapters:",
        "novel.newEpisodeBtn": "+ Add New Episode",
        "novel.deleteEpisodeBtn": "× Delete Episode",
        "novel.subtitleLabel": "Subtitle / Episode Title:",
        "novel.episodeTitlePlaceholder": "e.g., Episode 1: Rainy Day After School",
        "novel.aiDesc": "Have the AI write a story tailored to this character and situation.",
        "novel.themePlaceholder": "What kind of situation or prompt?",
        "novel.aiWriteBtn": "AI Write",
        "novel.theaterLabel": "Writing & Reading Theater:",
        "novel.outputPlaceholder": "Your story will unfold here...",
        "novel.renameSeriesBtn": "Rename Series",
        "novel.renamePrompt": "Enter a new series name:",
        "novel.overviewTitle": "Recent Series",
        "novel.overviewEmpty": "No series yet. Select a character to create a new series.",
        "novel.episodeUnit": "eps",
        "novel.saved": "Saved!",
        "novel.savedLocalOnly": "Saved to this device. Click 'Save Online' at the top to publish to the web.",
        "novel.saveBtn": "Save This Episode",
        "char.formFab": "Form",
        "char.formClose": "Hide",
        "char.fullscreenClose": "× Close",
        "common.language": "Language",
        "birthday.congrats": "Happy Birthday!",
        "js.editMode": "",
        "js.viewMode": "View Mode",
        "char.openDetailPage": "View Character Page",
        "char.backBtn": "← Back",
        "char.detailGalleryTitle": "Character Gallery",
        "char.detailGalleryEmpty": "No gallery images registered yet.",
        "char.galleryUploadLabel": "Character Gallery",
        "char.galleryTitlePlaceholder": "Image Title (Optional)",
        "char.addGalleryImageBtn": "+ Add to Gallery",
        "js.previewMode": "Previewing",
        "js.previewAsVisitor": "View as Visitor",
        "js.backToEdit": "Back to Editing",
        "settings.title": "Site Visibility Settings",
        "settings.pageVisibilityLabel": "Page Visibility",
        "settings.public": "Public (Listed on the start page directory)",
        "settings.unlisted": "Unlisted (Accessible only via direct URL; hidden from directory)",
        "settings.saved": "Settings saved.",
        "settings.saveFailed": "Failed to save settings.",
        "portal.noCreatorsYet": "No creators registered yet. Log in and set up your profile to appear here automatically!",
        "portal.needLoginToCreate": "You need to log in to create a page!",
        "portal.createPageFailed": "Failed to create page.",
        "char.isPublicLabel": "Make this character public (Uncheck to keep private and visible only to you)",
        "char.privateBadge": "Private",
        "js.worldless": "No Worldline",
        "js.all": "All",
        "js.detailOpen": "+ Details",
        "js.detailClose": "- Details",
        "js.edit": "Edit",
        "js.delete": "Delete",
        "js.favoriteOn": "★ Unfavorite",
        "js.favoriteOff": "☆ Favorite",
        "js.trashBtn": "Trash",
        "js.restoreBtn": "Restore",
        "js.permaDeleteBtn": "Delete Permanently",
        "js.unregisteredCreator": "Unregistered Creator",
        "js.noBioYet": "No bio yet."
    },
    ko: {
        "header.notLoggedIn": "열람 모드",
        "header.pleaseLogin": "로그인해 주세요",
        "header.loggedIn": "로그인 중",
        "header.publish": "온라인 저장",
        "header.googleLogin": "Google로 로그인",
        "header.myPage": "마이페이지",
        "header.noMyPage": "아직 페이지가 없습니다. '새 페이지 만들기'에서 생성해 주세요.",
        "header.myPageFailed": "마이페이지를 열지 못했습니다. 다시 시도해 주세요.",
        "header.pageAlreadyExists": "이미 페이지가 존재합니다. 마이페이지로 이동합니다.",
        "ai.notDeployed": "서버에서 AI 함수를 찾을 수 없습니다.",
        "ai.unknownError": "AI로부터 응답을 받지 못했습니다.",
        "ai.errorPrefix": "통신 오류가 발생했습니다: ",
        "header.logout": "로그아웃",
        "header.switchAccount": "계정 전환",
        "header.switchAccountFailed": "계정 전환에 실패했습니다.",
        "sidebar.title": "메뉴",
        "sidebar.home": "홈 / 갤러리",
        "sidebar.homeShort": "홈",
        "sidebar.characters": "캐릭터 도감",
        "sidebar.charShort": "도감",
        "sidebar.lore": "세계관·용어 사전",
        "sidebar.loreShort": "사전",
        "sidebar.novel": "소설·스토리",
        "sidebar.novelShort": "소설",
        "portal.newsTitle": "\\ 자캐·관계캐 관리 사이트 공지사항 /",
        "portal.newsLoading": "공지사항을 불러오는 중...",
        "portal.noNewsYet": "현재 등록된 공지사항이 없습니다.",
        "portal.editNewsBtn": "[관리자] 공지 수정",
        "portal.editNewsTitle": "공지사항 수정 (관리자 모드)",
        "portal.newsPlaceholder": "공지 내용을 입력해 주세요...",
        "portal.saveNews": "공지 저장",
        "portal.newPagePrompt": "새로운 페이지를 만들어 보시겠어요?",
        "portal.createPageBtn": "+ 새 페이지 만들기",
        "portal.creatorListTitle": "크리에이터 목록",
        "portal.creatorListHint": "이름에 마우스를 올리면 각 작가의 마이페이지로 이동할 수 있습니다!",
        "portal.adminLogin": "[관리자 모드로 로그인]",
        "profile.editBtn": "프로필 편집",
        "profile.nameLabel": "작가명",
        "profile.namePlaceholder": "작가명 (닉네임)",
        "profile.bioLabel": "자기소개",
        "profile.bioPlaceholder": "취향, 지뢰, 고정 페어에게 한마디 등",
        "profile.snsLabel": "주요 SNS (비워두어도 무방)",
        "profile.extraLinksLabel": "기타 외부 링크 (자유롭게 추가)",
        "profile.linkNamePlaceholder": "링크 이름 (예: 개인 홈페이지)",
        "common.urlPlaceholder": "https://...",
        "common.addToList": "+ 목록에 추가",
        "common.save": "저장하기",
        "common.cancel": "취소",
        "common.close": "닫기",
        "common.search": "검색",
        "common.addLinkToList": "+ 링크 추가",
        "common.addRelation": "+ 관계 추가",
        "home.galleryTitle": "갤러리",
        "home.introText": "등록된 캐릭터와 세계관 설정, 관련 일러스트를 모아둔 페이지입니다.",
        "home.galleryManageTitle": "갤러리 이미지 관리",
        "home.galleryManageDesc": "홈 화면 최상단에 표시할 대표 일러스트를 추가·삭제·정렬할 수 있습니다.",
        "home.galleryTitlePlaceholder": "이미지 제목 (예: 단체 일러스트, 스탠딩 등)",
        "home.addImageBtn": "이미지 추가",
        "home.registeredImagesLabel": "등록된 이미지 목록:",
        "char.pageTitle": "캐릭터 도감",
        "char.advancedSearchBtn": "상세 필터링 (세계선·태그)",
        "char.randomPickBtn": "[!] 오늘 그릴 캐릭터 추첨",
        "char.worldSearchPlaceholder": "세계선으로 검색",
        "char.worldPickLabel": "세계선 선택:",
        "char.tagPickLabel": "태그 선택:",
        "trash.title": "휴지통 (30일간 보관 후 영구 삭제됩니다)",
        "trash.empty": "휴지통이 비어 있습니다.",
        "char.sortNew": "최신순",
        "char.sortOld": "오래된순",
        "char.sortName": "이름순",
        "char.sortFavorite": "★ 즐겨찾기순",
        "char.fullscreenBtn": "전체 화면",
        "char.backupSaveBtn": "백업 저장",
        "char.backupLoadBtn": "백업 불러오기",
        "char.pasteImportTitle": "타 사이트에서 복사·붙여넣기로 가져오기:",
        "char.pasteImportPlaceholder": "여기에 데이터를 Ctrl+V(붙여넣기) 하세요",
        "char.parseImportBtn": "데이터 분석 후 도감에 추가",
        "char.jsonImportTitle": "타 사이트 데이터(JSON 파일) 가져오기:",
        "char.worldPlaceholder": "예: 판타지, 학원물",
        "char.groupPlaceholder": "조직·유닛 (예: 암살 조직, 경찰 등)",
        "char.tagPlaceholder": "주인공, 검사, 쿨데레",
        "char.namePlaceholder": "이름",
        "char.furiganaPlaceholder": "읽는 법 / 별칭",
        "char.personalityPlaceholder": "성격",
        "char.occupationPlaceholder": "직업·칭호",
        "char.labelWorld": "세계선:",
        "char.labelTag": "태그:",
        "char.labelOccupation": "직업:",
        "char.labelPersonality": "성격:",
        "char.labelBirthday": "생일:",
        "char.labelRelations": "관계:",
        "char.birthdayPlaceholder": "예: 3월 14일 / 3/14",
        "char.favColorLabel": "테마 컬러·이미지 컬러:",
        "char.linksLabel": "관련 링크",
        "char.linkTitlePlaceholder": "링크 제목",
        "char.themeVideoLabel": "테마곡·이미지 영상 (YouTube)",
        "char.addVideoBtn": "+ 동영상 URL 추가",
        "char.memoLabel": "메모·상세 설정",
        "char.addMemoBtn": "+ 새 메모 칸 추가",
        "char.aiStoryBtn": "AI에게 백스토리 집필 맡기기",
        "char.relationsLabel": "관계 추가",
        "char.relationTitlePlaceholder": "예: 파트너, 라이벌, 짝사랑",
        "char.costumeLabel": "의상·스탠딩 등록 (메인 의상도 다른 의상도 여기서!)",
        "char.costumeNamePlaceholder": "의상명 (예: 기본, 교복, 어린 시절)",
        "char.addCostumeBtn": "+ 목록에 의상 추가",
        "char.submitBtn": "캐릭터 추가·수정",
        "char.thumbPositionLabel": "카드 썸네일 표시 위치 (크롭):",
        "char.thumbTop": "상단 (얼굴 우선)",
        "char.thumbCenter": "중앙 (전체 우선)",
        "char.thumbBottom": "하단 (발끝 우선)",
        "novel.pageTitle": "소설·스토리 관리",
        "novel.worldLabel": "세계선:",
        "novel.groupLabel": "조직·유닛:",
        "novel.charLabel": "캐릭터:",
        "novel.seriesLabel": "선택된 작품 (시리즈):",
        "novel.newSeriesBtn": "+ 새 시리즈 만들기",
        "novel.deleteSeriesBtn": "× 시리즈 삭제",
        "novel.episodesLabel": "에피소드 (회차) 목록:",
        "novel.newEpisodeBtn": "+ 새 회차 추가",
        "novel.deleteEpisodeBtn": "× 이 회차 삭제",
        "novel.subtitleLabel": "부제 / 회차 제목:",
        "novel.episodeTitlePlaceholder": "예: 제1화 비 오는 날의 방과 후",
        "novel.aiDesc": "이 캐릭터와 상황에 맞는 소설을 AI가 집필합니다.",
        "novel.themePlaceholder": "어떤 시추에이션으로 쓸까요?",
        "novel.aiWriteBtn": "AI 집필",
        "novel.theaterLabel": "본문 집필·열람 시어터:",
        "novel.outputPlaceholder": "이곳에 이야기가 펼쳐집니다...",
        "novel.renameSeriesBtn": "시리즈명 변경",
        "novel.renamePrompt": "새로운 시리즈 이름을 입력해 주세요:",
        "novel.overviewTitle": "최근 시리즈",
        "novel.overviewEmpty": "아직 시리즈가 없습니다. 캐릭터를 선택해 새 시리즈를 만들어 보세요.",
        "novel.episodeUnit": "화",
        "novel.saved": "저장되었습니다!",
        "novel.savedLocalOnly": "이 기기에 저장되었습니다. 웹에 반영하려면 상단의 '온라인 저장'을 눌러주세요.",
        "novel.saveBtn": "이 회차 저장하기",
        "char.formFab": "입력",
        "char.formClose": "접기",
        "char.fullscreenClose": "× 닫기",
        "common.language": "언어",
        "birthday.congrats": "생일 축하합니다!",
        "js.editMode": "",
        "js.viewMode": "열람 모드",
        "char.openDetailPage": "캐릭터 개별 페이지 보기",
        "char.backBtn": "← 뒤로",
        "char.detailGalleryTitle": "캐릭터 갤러리",
        "char.detailGalleryEmpty": "아직 등록된 갤러리 이미지가 없습니다.",
        "char.galleryUploadLabel": "캐릭터 개별 갤러리",
        "char.galleryTitlePlaceholder": "이미지 제목 (선택 사항)",
        "char.addGalleryImageBtn": "+ 갤러리에 추가",
        "js.previewMode": "미리보기 중",
        "js.previewAsVisitor": "방문자 시점으로 보기",
        "js.backToEdit": "편집으로 돌아가기",
        "settings.title": "사이트 공개 설정",
        "settings.pageVisibilityLabel": "내 페이지 공개 범위",
        "settings.public": "전체 공개 (시작 페이지 목록에 표시됨)",
        "settings.unlisted": "일부 공개 (URL을 아는 사람만 열람 가능, 목록에는 미표시)",
        "settings.saved": "설정이 저장되었습니다",
        "settings.saveFailed": "설정 저장에 실패했습니다",
        "portal.noCreatorsYet": "아직 등록된 작가가 없습니다. 로그인 후 프로필을 등록하면 이곳에 자동으로 표시됩니다!",
        "portal.needLoginToCreate": "페이지를 만들려면 로그인이 필요합니다!",
        "portal.createPageFailed": "페이지 생성에 실패했습니다.",
        "char.isPublicLabel": "이 캐릭터 공개하기 (체크 해제 시 나에게만 보이는 비공개 상태가 됩니다)",
        "char.privateBadge": "비공개",
        "js.worldless": "세계선 없음",
        "js.all": "전체",
        "js.detailOpen": "+ 상세",
        "js.detailClose": "- 상세",
        "js.edit": "편집",
        "js.delete": "삭제",
        "js.favoriteOn": "★ 해제",
        "js.favoriteOff": "☆ 즐겨찾기",
        "js.trashBtn": "휴지통",
        "js.restoreBtn": "복원",
        "js.permaDeleteBtn": "영구 삭제",
        "js.unregisteredCreator": "미등록 크리에이터",
        "js.noBioYet": "아직 자기소개가 없습니다."
    },
    "zh-Hans": {
        "header.notLoggedIn": "浏览模式",
        "header.pleaseLogin": "请登录",
        "header.loggedIn": "已登录",
        "header.publish": "保存至网络",
        "header.googleLogin": "使用 Google 登录",
        "header.myPage": "个人主页",
        "header.noMyPage": "您还没有创建页面，请点击“创建新页面”开始制作。",
        "header.myPageFailed": "无法打开个人主页，请重试。",
        "header.pageAlreadyExists": "您已有创建的页面，正在打开个人主页。",
        "ai.notDeployed": "服务器上未找到 AI 函数。",
        "ai.unknownError": "未能从 AI 接收到响应",
        "ai.errorPrefix": "发生通信错误: ",
        "header.logout": "退出登录",
        "header.switchAccount": "切换账号",
        "header.switchAccountFailed": "切换账号失败。",
        "sidebar.title": "菜单",
        "sidebar.home": "主页 / 画廊",
        "sidebar.homeShort": "主页",
        "sidebar.characters": "角色图鉴",
        "sidebar.charShort": "图鉴",
        "sidebar.lore": "世界观・用语词典",
        "sidebar.loreShort": "词典",
        "sidebar.novel": "小说・故事",
        "sidebar.novelShort": "小说",
        "portal.newsTitle": "\\ OC与关系管理站公告 /",
        "portal.newsLoading": "正在加载公告...",
        "portal.noNewsYet": "目前暂无公告。",
        "portal.editNewsBtn": "[管理员] 编辑公告",
        "portal.editNewsTitle": "编辑公告（管理员模式）",
        "portal.newsPlaceholder": "请输入公告内容...",
        "portal.saveNews": "保存公告",
        "portal.newPagePrompt": "要开始创建新页面吗？",
        "portal.createPageBtn": "＋ 创建新页面",
        "portal.creatorListTitle": "创作者列表",
        "portal.creatorListHint": "将鼠标悬停在名字上，即可前往各位作者的个人主页！",
        "portal.adminLogin": "[以管理员模式登录]",
        "profile.editBtn": "编辑个人资料",
        "profile.nameLabel": "作者名",
        "profile.namePlaceholder": "作者名（昵称）",
        "profile.bioLabel": "自我介绍",
        "profile.bioPlaceholder": "XP偏好、雷点、给固定搭档的留言等",
        "profile.snsLabel": "主要社交账号（可留空）",
        "profile.extraLinksLabel": "其他外部链接（可自由添加）",
        "profile.linkNamePlaceholder": "链接名称（例：个人网站）",
        "common.urlPlaceholder": "https://...",
        "common.addToList": "＋ 添加至列表",
        "common.save": "保存",
        "common.cancel": "取消",
        "common.close": "关闭",
        "common.search": "搜索",
        "common.addLinkToList": "＋ 添加链接",
        "common.addRelation": "＋ 添加关系",
        "home.galleryTitle": "画廊",
        "home.introText": "汇总已登记角色、世界观设定与相关插画的页面。",
        "home.galleryManageTitle": "画廊图片管理",
        "home.galleryManageDesc": "可添加、删除或排序展示在主页顶部的得意插画。",
        "home.galleryTitlePlaceholder": "图片标题（例：合照、立绘等）",
        "home.addImageBtn": "添加图片",
        "home.registeredImagesLabel": "已登记图片列表:",
        "char.pageTitle": "角色图鉴",
        "char.advancedSearchBtn": "高级筛选（世界线・标签）",
        "char.randomPickBtn": "[!] 抽取今日要画的角色",
        "char.worldSearchPlaceholder": "按世界线搜索",
        "char.worldPickLabel": "按世界线筛选:",
        "char.tagPickLabel": "按标签筛选:",
        "trash.title": "回收站（保留30天后将永久删除）",
        "trash.empty": "回收站为空。",
        "char.sortNew": "最新优先",
        "char.sortOld": "最早优先",
        "char.sortName": "按名称排序",
        "char.sortFavorite": "★ 收藏优先",
        "char.fullscreenBtn": "全屏",
        "char.backupSaveBtn": "保存备份",
        "char.backupLoadBtn": "读取备份",
        "char.pasteImportTitle": "从其他网站复制粘贴导入:",
        "char.pasteImportPlaceholder": "请在此处按 Ctrl+V（粘贴）数据",
        "char.parseImportBtn": "解析数据并添加至图鉴",
        "char.jsonImportTitle": "导入其他网站的数据（JSON文件）:",
        "char.worldPlaceholder": "例：奇幻、校园",
        "char.groupPlaceholder": "组织・阵营（例：暗杀组织、警察等）",
        "char.tagPlaceholder": "主角, 剑士, 高冷",
        "char.namePlaceholder": "姓名",
        "char.furiganaPlaceholder": "注音 / 别名",
        "char.personalityPlaceholder": "性格",
        "char.occupationPlaceholder": "职业・头衔",
        "char.labelWorld": "世界线:",
        "char.labelTag": "标签:",
        "char.labelOccupation": "职业:",
        "char.labelPersonality": "性格:",
        "char.labelBirthday": "生日:",
        "char.labelRelations": "关系:",
        "char.birthdayPlaceholder": "例：3月14日 / 3/14",
        "char.favColorLabel": "代表色・印象色:",
        "char.linksLabel": "相关链接",
        "char.linkTitlePlaceholder": "链接标题",
        "char.themeVideoLabel": "角色印象曲・主题视频（YouTube）",
        "char.addVideoBtn": "＋ 添加视频URL",
        "char.memoLabel": "备注・详细设定",
        "char.addMemoBtn": "＋ 添加新备注栏",
        "char.aiStoryBtn": "让 AI 撰写背景故事",
        "char.relationsLabel": "添加关系",
        "char.relationTitlePlaceholder": "例：搭档、劲敌、单恋",
        "char.costumeLabel": "服装・立绘登记（主立绘与差分服装均在此添加！）",
        "char.costumeNamePlaceholder": "服装名称（例：常服、校服、幼年）",
        "char.addCostumeBtn": "＋ 添加服装至列表",
        "char.submitBtn": "添加・更新角色",
        "char.thumbPositionLabel": "卡片缩略图裁剪位置:",
        "char.thumbTop": "顶部（优先显示脸部）",
        "char.thumbCenter": "居中（优先显示全身）",
        "char.thumbBottom": "底部（优先显示脚部）",
        "novel.pageTitle": "小说・故事管理",
        "novel.worldLabel": "世界线:",
        "novel.groupLabel": "组织・阵营:",
        "novel.charLabel": "角色:",
        "novel.seriesLabel": "当前作品（系列）:",
        "novel.newSeriesBtn": "＋ 新建系列",
        "novel.deleteSeriesBtn": "× 删除系列",
        "novel.episodesLabel": "章节（话数）列表:",
        "novel.newEpisodeBtn": "＋ 添加新章节",
        "novel.deleteEpisodeBtn": "× 删除本章",
        "novel.subtitleLabel": "副标题 / 章节标题:",
        "novel.episodeTitlePlaceholder": "例：第1话 雨天的放学后",
        "novel.aiDesc": "让 AI 根据该角色与情境撰写小说。",
        "novel.themePlaceholder": "想要设定怎样的情境？",
        "novel.aiWriteBtn": "AI 撰写",
        "novel.theaterLabel": "正文撰写・阅读剧场:",
        "novel.outputPlaceholder": "故事将在这里徐徐展开...",
        "novel.renameSeriesBtn": "修改系列名",
        "novel.renamePrompt": "请输入新的系列名称：",
        "novel.overviewTitle": "近期系列",
        "novel.overviewEmpty": "暂无系列作品。请选择角色并创建新系列吧。",
        "novel.episodeUnit": "话",
        "novel.saved": "已保存！",
        "novel.savedLocalOnly": "已保存至本设备。如需同步到网络，请点击顶部的“保存至网络”。",
        "novel.saveBtn": "保存本章",
        "char.formFab": "录入",
        "char.formClose": "收起",
        "char.fullscreenClose": "× 关闭",
        "common.language": "语言",
        "birthday.congrats": "生日快乐！",
        "js.editMode": "",
        "js.viewMode": "浏览模式",
        "char.openDetailPage": "查看角色独立页面",
        "char.backBtn": "← 返回",
        "char.detailGalleryTitle": "角色画廊",
        "char.detailGalleryEmpty": "尚未登记画廊图片。",
        "char.galleryUploadLabel": "角色专属画廊",
        "char.galleryTitlePlaceholder": "图片标题（选填）",
        "char.addGalleryImageBtn": "＋ 添加至画廊",
        "js.previewMode": "预览中",
        "js.previewAsVisitor": "以访客视角查看",
        "js.backToEdit": "返回编辑",
        "settings.title": "网站公开设置",
        "settings.pageVisibilityLabel": "您的页面公开范围",
        "settings.public": "完全公开（显示在起始页的创作者列表中）",
        "settings.unlisted": "不公开列出（仅限知道链接的人访问，不显示在列表中）",
        "settings.saved": "设置已保存",
        "settings.saveFailed": "保存设置失败",
        "portal.noCreatorsYet": "目前暂无已登记的作者。登录后完善个人资料，即可自动显示在这里！",
        "portal.needLoginToCreate": "创建页面需要先登录！",
        "portal.createPageFailed": "创建页面失败。",
        "char.isPublicLabel": "公开此角色（取消勾选将设为仅自己可见的私密状态）",
        "char.privateBadge": "私密",
        "js.worldless": "无世界线",
        "js.all": "全部",
        "js.detailOpen": "+ 详情",
        "js.detailClose": "- 详情",
        "js.edit": "编辑",
        "js.delete": "删除",
        "js.favoriteOn": "★ 取消收藏",
        "js.favoriteOff": "☆ 收藏",
        "js.trashBtn": "回收站",
        "js.restoreBtn": "还原",
        "js.permaDeleteBtn": "永久删除",
        "js.unregisteredCreator": "未登记的创作者",
        "js.noBioYet": "暂无自我介绍。"
    },
    "zh-Hant": {
        "header.notLoggedIn": "瀏覽模式",
        "header.pleaseLogin": "請登入",
        "header.loggedIn": "已登入",
        "header.publish": "儲存至網路",
        "header.googleLogin": "使用 Google 登入",
        "header.myPage": "個人主頁",
        "header.noMyPage": "您還沒有建立頁面，請點擊「建立新頁面」開始製作。",
        "header.myPageFailed": "無法開啟個人主頁，請再試一次。",
        "header.pageAlreadyExists": "您已有建立的頁面，正在開啟個人主頁。",
        "ai.notDeployed": "伺服器上找不到 AI 函式。",
        "ai.unknownError": "未能從 AI 接收到回應",
        "ai.errorPrefix": "發生連線錯誤: ",
        "header.logout": "登出",
        "header.switchAccount": "切換帳號",
        "header.switchAccountFailed": "切換帳號失敗。",
        "sidebar.title": "選單",
        "sidebar.home": "首頁 / 畫廊",
        "sidebar.homeShort": "首頁",
        "sidebar.characters": "角色圖鑑",
        "sidebar.charShort": "圖鑑",
        "sidebar.lore": "世界觀・用語詞典",
        "sidebar.loreShort": "詞典",
        "sidebar.novel": "小說・故事",
        "sidebar.novelShort": "小說",
        "portal.newsTitle": "\\ OC與關係管理站公告 /",
        "portal.newsLoading": "正在載入公告...",
        "portal.noNewsYet": "目前暫無公告。",
        "portal.editNewsBtn": "[管理員] 編輯公告",
        "portal.editNewsTitle": "編輯公告（管理員模式）",
        "portal.newsPlaceholder": "請輸入公告內容...",
        "portal.saveNews": "儲存公告",
        "portal.newPagePrompt": "要開始建立新頁面嗎？",
        "portal.createPageBtn": "＋ 建立新頁面",
        "portal.creatorListTitle": "創作者列表",
        "portal.creatorListHint": "將滑鼠游標移至名字上，即可前往各位作者的個人主頁！",
        "portal.adminLogin": "[以管理員模式登入]",
        "profile.editBtn": "編輯個人資料",
        "profile.nameLabel": "作者名",
        "profile.namePlaceholder": "作者名（暱稱）",
        "profile.bioLabel": "自我介紹",
        "profile.bioPlaceholder": "XP偏好、雷點、給固定搭檔的留言等",
        "profile.snsLabel": "主要社群帳號（可留空）",
        "profile.extraLinksLabel": "其他外部連結（可自由新增）",
        "profile.linkNamePlaceholder": "連結名稱（例：個人網站）",
        "common.urlPlaceholder": "https://...",
        "common.addToList": "＋ 新增至列表",
        "common.save": "儲存",
        "common.cancel": "取消",
        "common.close": "關閉",
        "common.search": "搜尋",
        "common.addLinkToList": "＋ 新增連結",
        "common.addRelation": "＋ 新增關係",
        "home.galleryTitle": "畫廊",
        "home.introText": "彙整已登錄角色、世界觀設定與相關插畫的頁面。",
        "home.galleryManageTitle": "畫廊圖片管理",
        "home.galleryManageDesc": "可新增、刪除或排序顯示在首頁頂部的得意插畫。",
        "home.galleryTitlePlaceholder": "圖片標題（例：合照、立繪等）",
        "home.addImageBtn": "新增圖片",
        "home.registeredImagesLabel": "已登記圖片列表:",
        "char.pageTitle": "角色圖鑑",
        "char.advancedSearchBtn": "進階篩選（世界線・標籤）",
        "char.randomPickBtn": "[!] 抽取今日要畫的角色",
        "char.worldSearchPlaceholder": "依世界線搜尋",
        "char.worldPickLabel": "依世界線篩選:",
        "char.tagPickLabel": "依標籤篩選:",
        "trash.title": "垃圾桶（保留30天後將永久刪除）",
        "trash.empty": "垃圾桶是空的。",
        "char.sortNew": "最新優先",
        "char.sortOld": "最舊優先",
        "char.sortName": "依名稱排序",
        "char.sortFavorite": "★ 收藏優先",
        "char.fullscreenBtn": "全螢幕",
        "char.backupSaveBtn": "儲存備份",
        "char.backupLoadBtn": "讀取備份",
        "char.pasteImportTitle": "從其他網站複製貼上匯入:",
        "char.pasteImportPlaceholder": "請在此處按 Ctrl+V（貼上）資料",
        "char.parseImportBtn": "解析資料並新增至圖鑑",
        "char.jsonImportTitle": "匯入其他網站的資料（JSON檔案）:",
        "char.worldPlaceholder": "例：奇幻、校園",
        "char.groupPlaceholder": "組織・陣營（例：暗殺組織、警察等）",
        "char.tagPlaceholder": "主角, 劍士, 高冷",
        "char.namePlaceholder": "姓名",
        "char.furiganaPlaceholder": "讀音 / 別名",
        "char.personalityPlaceholder": "性格",
        "char.occupationPlaceholder": "職業・頭銜",
        "char.labelWorld": "世界線:",
        "char.labelTag": "標籤:",
        "char.labelOccupation": "職業:",
        "char.labelPersonality": "性格:",
        "char.labelBirthday": "生日:",
        "char.labelRelations": "關係:",
        "char.birthdayPlaceholder": "例：3月14日 / 3/14",
        "char.favColorLabel": "代表色・印象色:",
        "char.linksLabel": "相關連結",
        "char.linkTitlePlaceholder": "連結標題",
        "char.themeVideoLabel": "角色印象曲・主題影片（YouTube）",
        "char.addVideoBtn": "＋ 新增影片URL",
        "char.memoLabel": "備註・詳細設定",
        "char.addMemoBtn": "＋ 新增備註欄",
        "char.aiStoryBtn": "讓 AI 撰寫背景故事",
        "char.relationsLabel": "新增關係",
        "char.relationTitlePlaceholder": "例：搭檔、勁敵、單戀",
        "char.costumeLabel": "服裝・立繪登記（主立繪與差分服裝均在此新增！）",
        "char.costumeNamePlaceholder": "服裝名稱（例：常服、校服、幼年）",
        "char.addCostumeBtn": "＋ 新增服裝至列表",
        "char.submitBtn": "新增・更新角色",
        "char.thumbPositionLabel": "卡片縮圖裁切位置:",
        "char.thumbTop": "頂部（優先顯示臉部）",
        "char.thumbCenter": "置中（優先顯示全身）",
        "char.thumbBottom": "底部（優先顯示腳部）",
        "novel.pageTitle": "小說・故事管理",
        "novel.worldLabel": "世界線:",
        "novel.groupLabel": "組織・陣營:",
        "novel.charLabel": "角色:",
        "novel.seriesLabel": "目前作品（系列）:",
        "novel.newSeriesBtn": "＋ 新建系列",
        "novel.deleteSeriesBtn": "× 刪除系列",
        "novel.episodesLabel": "章節（話數）列表:",
        "novel.newEpisodeBtn": "＋ 新增章節",
        "novel.deleteEpisodeBtn": "× 刪除本章",
        "novel.subtitleLabel": "副標題 / 章節標題:",
        "novel.episodeTitlePlaceholder": "例：第1話 雨天的放學後",
        "novel.aiDesc": "讓 AI 根據該角色與情境撰寫小說。",
        "novel.themePlaceholder": "想要設定怎樣的情境？",
        "novel.aiWriteBtn": "AI 撰寫",
        "novel.theaterLabel": "內文撰寫・閱讀劇場:",
        "novel.outputPlaceholder": "故事將在這裡徐徐展開...",
        "novel.renameSeriesBtn": "修改系列名",
        "novel.renamePrompt": "請輸入新的系列名稱：",
        "novel.overviewTitle": "近期系列",
        "novel.overviewEmpty": "暫無系列作品。請選擇角色並建立新系列吧。",
        "novel.episodeUnit": "話",
        "novel.saved": "已儲存！",
        "novel.savedLocalOnly": "已儲存至此裝置。如需同步至網路，請點擊頂部的「儲存至網路」。",
        "novel.saveBtn": "儲存本章",
        "char.formFab": "填寫",
        "char.formClose": "收起",
        "char.fullscreenClose": "× 關閉",
        "common.language": "語言",
        "birthday.congrats": "生日快樂！",
        "js.editMode": "",
        "js.viewMode": "瀏覽模式",
        "char.openDetailPage": "查看角色獨立頁面",
        "char.backBtn": "← 返回",
        "char.detailGalleryTitle": "角色畫廊",
        "char.detailGalleryEmpty": "尚未登記畫廊圖片。",
        "char.galleryUploadLabel": "角色專屬畫廊",
        "char.galleryTitlePlaceholder": "圖片標題（選填）",
        "char.addGalleryImageBtn": "＋ 新增至畫廊",
        "js.previewMode": "預覽中",
        "js.previewAsVisitor": "以訪客視角檢視",
        "js.backToEdit": "返回編輯",
        "settings.title": "網站公開設定",
        "settings.pageVisibilityLabel": "您的頁面公開範圍",
        "settings.public": "完全公開（顯示於起始頁的創作者列表中）",
        "settings.unlisted": "不公開列出（僅限知道連結的人瀏覽，不顯示於列表中）",
        "settings.saved": "設定已儲存",
        "settings.saveFailed": "儲存設定失敗",
        "portal.noCreatorsYet": "目前暫無已登記的作者。登入後完善個人資料，即可自動顯示在這裡！",
        "portal.needLoginToCreate": "建立頁面需要先登入！",
        "portal.createPageFailed": "建立頁面失敗。",
        "char.isPublicLabel": "公開此角色（取消勾選將設為僅自己可見的私密狀態）",
        "char.privateBadge": "私密",
        "js.worldless": "無世界線",
        "js.all": "全部",
        "js.detailOpen": "+ 詳情",
        "js.detailClose": "- 詳情",
        "js.edit": "編輯",
        "js.delete": "刪除",
        "js.favoriteOn": "★ 取消收藏",
        "js.favoriteOff": "☆ 收藏",
        "js.trashBtn": "垃圾桶",
        "js.restoreBtn": "還原",
        "js.permaDeleteBtn": "永久刪除",
        "js.unregisteredCreator": "未登記的創作者",
        "js.noBioYet": "暫無自我介紹。"
    }
};

let currentLang = localStorage.getItem("lang") || "ja";

function t(key) {
    return (translations[currentLang] && translations[currentLang][key])
        || (translations.ja && translations.ja[key])
        || key;
}

function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-i18n]").forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll("[data-i18n-title]").forEach(el => {
        const label = t(el.dataset.i18nTitle);
        el.title = label;
        el.setAttribute("aria-label", label);
    });
    const langSelect = document.getElementById("langSelect");
    if (langSelect) langSelect.value = currentLang;
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    applyTranslations();
    if (typeof display === "function") display();
    if (typeof renderTrashList === "function") renderTrashList();
    if (typeof renderLoreEntries === "function") renderLoreEntries();
}
window.setLanguage = setLanguage;

// =========================================
// テーマ機能（SVGアイコンで切替）
// =========================================
function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeToggleIcon(savedTheme);
    if (typeof applyCustomTheme === "function") applyCustomTheme();
}

function isLightColorValue(color) {
    if (!color || typeof color !== "string") return false;
    const c = color.trim();
    let r = 0, g = 0, b = 0;
    const hex6 = c.match(/^#([0-9a-fA-F]{6})$/);
    const hex3 = c.match(/^#([0-9a-fA-F]{3})$/);
    if (hex6) {
        r = parseInt(hex6[1].slice(0, 2), 16);
        g = parseInt(hex6[1].slice(2, 4), 16);
        b = parseInt(hex6[1].slice(4, 6), 16);
    } else if (hex3) {
        r = parseInt(hex3[1][0] + hex3[1][0], 16);
        g = parseInt(hex3[1][1] + hex3[1][1], 16);
        b = parseInt(hex3[1][2] + hex3[1][2], 16);
    } else {
        return false;
    }
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance > 0.48;
}

function applyBgLayerImage(url, fit = "cover") {
    document.body.style.backgroundImage = "";
    const layer = document.getElementById("custom-bg-layer");
    if (!layer) return;
    if (url) {
        layer.style.backgroundImage = `url("${url}")`;
        layer.style.backgroundSize = (fit === "repeat") ? "auto" : fit;
        layer.style.backgroundRepeat = (fit === "repeat") ? "repeat" : "no-repeat";
        layer.style.backgroundPosition = "center";
        layer.classList.add("has-bg-image");
    } else {
        layer.style.backgroundImage = "";
        layer.classList.remove("has-bg-image");
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);

    const preset = localStorage.getItem("custom_theme_preset");
    const lightPresets = new Set(["light", "fantasy"]);
    const darkPresets = new Set(["dark", "cyber", "gothic"]);
    if (next === "dark" && lightPresets.has(preset)) {
        localStorage.removeItem("custom_theme_preset");
    } else if (next === "light" && darkPresets.has(preset)) {
        localStorage.removeItem("custom_theme_preset");
    }

    document.body.style.background = "";
    document.body.style.backgroundColor = "";
    updateThemeToggleIcon(next);
    if (typeof applyCustomTheme === "function") applyCustomTheme();
}
window.toggleTheme = toggleTheme;

function updateThemeToggleIcon(theme) {
    const btn = document.getElementById("themeToggleBtn");
    if (!btn) return;
    if (theme === "dark") {
        // 太陽のSVGアイコン
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    } else {
        // 月のSVGアイコン
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    }
}

function getPresetGradient(preset) {
    if (preset === "light") return "linear-gradient(135deg, #f4f6ff 0%, #fff0f7 50%, #f6f3ff 100%)";
    if (preset === "dark") return "linear-gradient(135deg, #0b0f19 0%, #15102a 50%, #0d1322 100%)";
    if (preset === "fantasy") return "linear-gradient(135deg, #fef3c7 0%, #fffbeb 50%, #fde68a 100%)";
    if (preset === "cyber") return "linear-gradient(135deg, #020617 0%, #0f172a 50%, #164e63 100%)";
    if (preset === "gothic") return "linear-gradient(135deg, #18052e 0%, #2e1065 50%, #090014 100%)";
    return "";
}

function applyPresetTheme(preset) {
    const body = document.getElementById("app-body");
    if (!body) return;

    let bgColor = "";
    const grad = getPresetGradient(preset);
    if (preset === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        body.style.background = grad;
    } else if (preset === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        body.style.background = grad;
    } else if (preset === "fantasy") {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        bgColor = "#fef3c7";
        body.style.background = grad;
    } else if (preset === "cyber") {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        bgColor = "#020617";
        body.style.background = grad;
    } else if (preset === "gothic") {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        bgColor = "#18052e";
        body.style.background = grad;
    }
    localStorage.setItem("custom_theme_preset", preset);
    if (bgColor) {
        localStorage.setItem("custom_theme_bgcolor", bgColor);
    } else {
        localStorage.removeItem("custom_theme_bgcolor");
    }
    updateThemeToggleIcon(document.documentElement.getAttribute("data-theme") || "light");
    const savedBg = localStorage.getItem("custom_theme_bg");
    const savedFit = localStorage.getItem("custom_theme_bg_fit") || "cover";
    applyBgLayerImage(savedBg, savedFit);
}
window.applyPresetTheme = applyPresetTheme;

// =========================================
// チュートリアル＆ヘルプ
// =========================================
function checkTutorial() {
    if (!localStorage.getItem("tutorial_shown")) {
        openHelpModal();
        localStorage.setItem("tutorial_shown", "true");
    }
}

function openHelpModal() {
    const modal = document.getElementById("helpTutorialModal");
    if (modal) modal.style.display = "flex";
}
window.openHelpModal = openHelpModal;

function closeHelpModal() {
    const modal = document.getElementById("helpTutorialModal");
    if (modal) modal.style.display = "none";
}
window.closeHelpModal = closeHelpModal;

function openFeedbackModal() {
    const modal = document.getElementById("feedbackModal");
    if (modal) modal.style.display = "flex";
}
window.openFeedbackModal = openFeedbackModal;

function closeFeedbackModal() {
    const modal = document.getElementById("feedbackModal");
    if (modal) modal.style.display = "none";
}
window.closeFeedbackModal = closeFeedbackModal;

function submitFeedback() {
    const name = document.getElementById("feedbackName").value.trim() || "名無し";
    const text = document.getElementById("feedbackText").value.trim();
    if (!text) return alert("お問い合わせ内容を入力してください！");
    alert(`ご意見・ご報告ありがとうございます！\n送信を受け付けました。\n\nお名前: ${name}\n内容: ${text}`);
    document.getElementById("feedbackText").value = "";
    closeFeedbackModal();
}
window.submitFeedback = submitFeedback;

// =========================================
// ファンアート＆応援メッセージ
// =========================================
let fanCheerMessages = [];
let tempCheerImageBase64 = null;

function openSendCheerModal(isForCurrentChar = false) {
    const modal = document.getElementById("sendCheerModal");
    const title = document.getElementById("sendCheerModalTitle");
    if (!modal) return;
    
    if (isForCurrentChar && detailCharId) {
        const c = characters.find(ch => ch.id === detailCharId);
        if (title) title.textContent = `${c ? c.name : "キャラクター"}へファンレターを贈る`;
    } else {
        if (title) title.textContent = `作者へ応援メッセージを贈る`;
    }

    tempCheerImageBase64 = null;
    const preview = document.getElementById("cheerImagePreview");
    if (preview) preview.innerHTML = "";
    const fileInput = document.getElementById("cheerImageFile");
    if (fileInput) {
        fileInput.value = "";
        fileInput.onchange = async (e) => {
            if (e.target.files && e.target.files[0]) {
                tempCheerImageBase64 = await compressImage(e.target.files[0], 800);
                if (preview) preview.innerHTML = `<img src="${tempCheerImageBase64}" style="max-width:140px; border-radius:6px;">`;
            }
        };
    }
    modal.style.display = "flex";
}
window.openSendCheerModal = openSendCheerModal;

function closeSendCheerModal() {
    const modal = document.getElementById("sendCheerModal");
    if (modal) modal.style.display = "none";
}
window.closeSendCheerModal = closeSendCheerModal;

async function submitCheerMessage() {
    const sender = document.getElementById("cheerSenderName").value.trim() || "匿名ファン";
    const msg = document.getElementById("cheerMessage").value.trim();
    if (!msg) return alert("メッセージを入力してください！");

    const cheerData = {
        id: Date.now(),
        sender: sender,
        message: msg,
        image: tempCheerImageBase64 || null,
        targetCharId: detailCharId || null,
        createdAt: new Date().toLocaleString()
    };

    fanCheerMessages.unshift(cheerData);
    localStorage.setItem("fan_cheers", JSON.stringify(fanCheerMessages));

    const pageId = new URLSearchParams(window.location.search).get('id');
    if (pageId) {
        try {
            await db.collection("pages").doc(pageId).collection("cheers").add(cheerData);
        } catch (e) {
            console.error(e);
        }
    }

    alert("温かい応援を送信しました！作者に届けられます。");
    document.getElementById("cheerMessage").value = "";
    closeSendCheerModal();
}
window.submitCheerMessage = submitCheerMessage;

function openCheerInboxModal() {
    const modal = document.getElementById("cheerInboxModal");
    if (!modal) return;
    renderCheerInboxList();
    modal.style.display = "flex";
}
window.openCheerInboxModal = openCheerInboxModal;

function closeCheerInboxModal() {
    const modal = document.getElementById("cheerInboxModal");
    if (modal) modal.style.display = "none";
}
window.closeCheerInboxModal = closeCheerInboxModal;

function renderCheerInboxList() {
    const box = document.getElementById("cheerInboxList");
    if (!box) return;

    if (fanCheerMessages.length === 0) {
        box.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:30px 0;">まだ届いた応援メッセージはありません。</p>`;
        return;
    }

    box.innerHTML = fanCheerMessages.map((c, i) => `
        <div class="cheer-item-card">
            <div class="cheer-item-header">
                <strong>From: ${escapeHTML(c.sender)}</strong>
                <span>${c.createdAt}</span>
            </div>
            <div class="cheer-item-msg">${escapeHTML(c.message)}</div>
            ${c.image ? `<img src="${c.image}" class="cheer-item-img" onclick="openModal('${c.image}')">` : ""}
            <div style="display:flex; justify-content:flex-end; gap:6px; margin-top:4px;">
                <button type="button" onclick="deleteCheerItem(${i})" class="header-btn danger" style="padding:4px 10px; font-size:11px;">削除</button>
            </div>
        </div>
    `).join("");
}

function deleteCheerItem(idx) {
    if (!confirm("この応援メッセージを削除しますか？")) return;
    fanCheerMessages.splice(idx, 1);
    localStorage.setItem("fan_cheers", JSON.stringify(fanCheerMessages));
    renderCheerInboxList();
}
window.deleteCheerItem = deleteCheerItem;

// =========================================
// なでなで機能（AA・記号・テキストパーティクル）
// =========================================
let isPatPatMode = false;
let patpatCount = 0;
let detailBaseArtUrl = "";
let patResetTimer = null;

function togglePatPatMode() {
    isPatPatMode = !isPatPatMode;
    const btn = document.getElementById("patpatModeToggleBtn");
    const target = document.getElementById("patpatTargetArea");
    const badge = document.getElementById("patpatCounterBadge");
    const img = document.getElementById("charDetailMainImg");

    if (isPatPatMode) {
        if (btn) {
            btn.classList.add("active");
            btn.textContent = "なでなでをやめる";
        }
        if (target) target.classList.add("patpat-active");
        if (badge) badge.style.display = "block";
        if (img) img.draggable = false;
    } else {
        if (btn) {
            btn.classList.remove("active");
            btn.textContent = "[撫でる] なでなでモード";
        }
        if (target) target.classList.remove("patpat-active");
    }
}
window.togglePatPatMode = togglePatPatMode;

function setupPatPatInteraction() {
    const img = document.getElementById("charDetailMainImg");
    if (!img || img.dataset.patpatBound === "true") return;
    img.dataset.patpatBound = "true";

    let isPetting = false;
    let lastPatTime = 0;
    let lastPatX = 0;
    let lastPatY = 0;

    img.addEventListener("pointerdown", (e) => {
        if (!isPatPatMode) return;
        e.preventDefault();
        isPetting = true;
        lastPatX = e.clientX;
        lastPatY = e.clientY;
        lastPatTime = Date.now();
        try { img.setPointerCapture(e.pointerId); } catch (_) {}
        patCharacter(e.clientX, e.clientY);
    });

    img.addEventListener("pointermove", (e) => {
        if (!isPatPatMode || !isPetting) return;
        e.preventDefault();
        const now = Date.now();
        const dist = Math.hypot(e.clientX - lastPatX, e.clientY - lastPatY);
        if (dist >= 22 && now - lastPatTime >= 75) {
            lastPatX = e.clientX;
            lastPatY = e.clientY;
            lastPatTime = now;
            patCharacter(e.clientX, e.clientY);
        }
    });

    const endPet = (e) => {
        if (!isPetting) return;
        isPetting = false;
        try { img.releasePointerCapture(e.pointerId); } catch (_) {}
    };
    img.addEventListener("pointerup", endPet);
    img.addEventListener("pointercancel", endPet);

    img.addEventListener("click", (e) => {
        if (isPatPatMode) {
            e.preventDefault();
            return;
        }
        if (img.src) openModal(img.src);
    });
}

function handleMainArtClick(e) {
    if (e) e.preventDefault();
    const img = document.getElementById("charDetailMainImg");
    if (!isPatPatMode) {
        if (img && img.src) openModal(img.src);
        return;
    }
    patCharacter(e.clientX, e.clientY);
}
window.handleMainArtClick = handleMainArtClick;

function getTodayDateKey() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function getYesterdayDateKey() {
    const now = new Date();
    now.setDate(now.getDate() - 1);
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

let dailyPatStats = { date: getTodayDateKey(), total: 0, chars: {} };
let pendingPatIncrements = { total: 0, chars: {} };
let patSyncTimer = null;

function getDailyPatStorageKey() {
    const pageId = new URLSearchParams(window.location.search).get('id') || 'local';
    return `daily_pat_stats_${pageId}`;
}

function loadLocalDailyPatStats() {
    const today = getTodayDateKey();
    try {
        const raw = localStorage.getItem(getDailyPatStorageKey());
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.date === today) {
                dailyPatStats = {
                    date: today,
                    total: Number(parsed.total) || 0,
                    chars: parsed.chars && typeof parsed.chars === "object" ? parsed.chars : {}
                };
                return;
            }
        }
    } catch (_) {}
    dailyPatStats = { date: today, total: 0, chars: {} };
}

function saveLocalDailyPatStats() {
    try {
        localStorage.setItem(getDailyPatStorageKey(), JSON.stringify(dailyPatStats));
    } catch (_) {}
}

function renderPatDailySummary() {
    const today = getTodayDateKey();
    if (dailyPatStats.date !== today) {
        dailyPatStats = { date: today, total: 0, chars: {} };
    }

    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : false;
    const banner = document.getElementById("authorPatDailyBanner");
    if (banner) {
        if (!editable) {
            banner.style.display = "none";
        } else {
            banner.style.display = "flex";
            const total = Number(dailyPatStats.total) || 0;
            const entries = Object.entries(dailyPatStats.chars || {})
                .filter(([, cnt]) => Number(cnt) > 0)
                .sort((a, b) => Number(b[1]) - Number(a[1]));

            const chipsHTML = entries.map(([cid, cnt]) => {
                const ch = characters.find(c => String(c.id) === String(cid) && !c.deletedAt);
                if (!ch) return "";
                return `<button type="button" class="author-pat-char-chip" onclick="openCharacterDetail(${ch.id})">${escapeHTML(ch.name)}: <strong>${Number(cnt)}回</strong></button>`;
            }).filter(Boolean).join("");

            if (total === 0) {
                banner.innerHTML = `<div class="author-pat-daily-title">今日はまだ撫でられていません（<strong>0</strong>回）</div>`;
            } else {
                banner.innerHTML = `
                    <div class="author-pat-daily-title">今日は <strong>${total}</strong> 回撫でられたよ！！</div>
                    ${chipsHTML ? `<div class="author-pat-chars-row">${chipsHTML}</div>` : ""}
                `;
            }
        }
    }

    const detailBadge = document.getElementById("charDetailTodayPatBadge");
    if (detailBadge) {
        if (editable && detailCharId != null) {
            const charCount = Number((dailyPatStats.chars && dailyPatStats.chars[String(detailCharId)]) || 0);
            detailBadge.textContent = `今日撫でられた回数: ${charCount}回`;
            detailBadge.style.display = "inline-block";
        } else {
            detailBadge.style.display = "none";
        }
    }
}
window.renderPatDailySummary = renderPatDailySummary;

async function flushPendingPatStats() {
    if (patSyncTimer) {
        clearTimeout(patSyncTimer);
        patSyncTimer = null;
    }
    const pageId = new URLSearchParams(window.location.search).get('id');
    const totalDelta = pendingPatIncrements.total || 0;
    const charDeltas = { ...(pendingPatIncrements.chars || {}) };
    if (!pageId || totalDelta <= 0) return;

    pendingPatIncrements = { total: 0, chars: {} };
    const today = getTodayDateKey();

    try {
        const pageRef = db.collection("pages").doc(pageId);
        const updatePayload = {};
        updatePayload[`dailyPatStatsByDate.${today}.total`] = firebase.firestore.FieldValue.increment(totalDelta);
        Object.entries(charDeltas).forEach(([cid, delta]) => {
            if (delta > 0) {
                updatePayload[`dailyPatStatsByDate.${today}.chars.${cid}`] = firebase.firestore.FieldValue.increment(delta);
            }
        });
        await pageRef.update(updatePayload).catch(async () => {
            const nestedChars = {};
            Object.entries(charDeltas).forEach(([cid, delta]) => {
                if (delta > 0) nestedChars[cid] = firebase.firestore.FieldValue.increment(delta);
            });
            await pageRef.set({
                dailyPatStatsByDate: {
                    [today]: {
                        total: firebase.firestore.FieldValue.increment(totalDelta),
                        chars: nestedChars
                    }
                }
            }, { merge: true });
        });
    } catch (e) {
        console.warn("Pat stats cloud sync skipped:", e);
    }
}

window.addEventListener("pagehide", () => {
    flushPendingPatStats();
});

function patCharacter(clientX, clientY) {
    patpatCount++;
    const countEl = document.getElementById("patpatCountText");
    if (countEl) countEl.textContent = patpatCount;

    const today = getTodayDateKey();
    if (dailyPatStats.date !== today) {
        dailyPatStats = { date: today, total: 0, chars: {} };
    }
    dailyPatStats.total = (Number(dailyPatStats.total) || 0) + 1;
    if (detailCharId != null) {
        const cid = String(detailCharId);
        dailyPatStats.chars[cid] = (Number(dailyPatStats.chars[cid]) || 0) + 1;
        pendingPatIncrements.chars[cid] = (pendingPatIncrements.chars[cid] || 0) + 1;
    }
    pendingPatIncrements.total = (pendingPatIncrements.total || 0) + 1;
    saveLocalDailyPatStats();
    renderPatDailySummary();

    if (patSyncTimer) clearTimeout(patSyncTimer);
    if (pendingPatIncrements.total >= 10) {
        flushPendingPatStats();
    } else {
        patSyncTimer = setTimeout(flushPendingPatStats, 900);
    }

    createPatParticle(clientX, clientY);
    triggerPatReaction();
}

const PAT_SYMBOLS = ["(仮)","(例)"];

function createPatParticle(x, y) {
    const layer = document.getElementById("patpatEffectLayer");
    if (!layer) return;

    const rect = layer.getBoundingClientRect();
    const relX = x - rect.left;
    const relY = y - rect.top;

    const symbol = PAT_SYMBOLS[Math.floor(Math.random() * PAT_SYMBOLS.length)];

    const particle = document.createElement("div");
    particle.className = "patpat-heart-particle";
    particle.textContent = symbol;
    particle.style.left = `${relX}px`;
    particle.style.top = `${relY}px`;

    layer.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
}

function triggerPatReaction() {
    const c = characters.find(ch => ch.id === detailCharId);
    if (c && c.images && c.images[detailArtIndex] && c.images[detailArtIndex].expressions && c.images[detailArtIndex].expressions.length > 0) {
        const happyExp = c.images[detailArtIndex].expressions[0];
        const mainImg = document.getElementById("charDetailMainImg");
        if (mainImg && happyExp && happyExp.url) {
            if (!detailBaseArtUrl) detailBaseArtUrl = mainImg.src;
            mainImg.src = happyExp.url;
            clearTimeout(patResetTimer);
            patResetTimer = setTimeout(() => {
                if (detailBaseArtUrl) mainImg.src = detailBaseArtUrl;
            }, 900);
        }
    }
}

// =========================================
// 世界観・用語事典（Lore Book）
// =========================================
let worldLore = [];
let currentLoreCat = "";
let selectedLoreId = null;
let editLoreId = null;
let tempLoreImageBase64 = null;

function getLoreStorageKey() {
    const pageId = new URLSearchParams(window.location.search).get('id');
    return pageId ? `world_lore_${pageId}` : "world_lore";
}

function loadLoreData() {
    const pageId = new URLSearchParams(window.location.search).get('id');
    const local = localStorage.getItem(getLoreStorageKey()) || (!pageId ? localStorage.getItem("world_lore") : null);
    if (local) {
        try { 
            worldLore = JSON.parse(local); 
        } catch (e) { 
            worldLore = []; 
        }
    } else {
        worldLore = [];
    }
}

function renderLoreEntries() {
    const catContainer = document.getElementById("loreCategoryTabs");
    const listContainer = document.getElementById("loreIndexList");
    const searchVal = (document.getElementById("loreSearchInput")?.value || "").toLowerCase();
    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : true;

    const addBtn = document.getElementById("addLoreEntryBtn");
    const detailActions = document.getElementById("loreDetailActions");
    if (addBtn) addBtn.style.display = editable ? "" : "none";
    if (detailActions) detailActions.style.display = editable ? "flex" : "none";

    const categories = ["全部", ...new Set(worldLore.map(l => l.category || "用語").filter(Boolean))];
    if (catContainer) {
        catContainer.innerHTML = categories.map(cat => `
            <button class="lore-cat-btn ${(currentLoreCat === cat || (!currentLoreCat && cat === '全部')) ? 'active' : ''}" onclick="filterLoreCat('${cat === '全部' ? '' : cat}')">${escapeHTML(cat)}</button>
        `).join("");
    }

    const filtered = worldLore.filter(l => {
        const matchCat = !currentLoreCat || l.category === currentLoreCat;
        const matchSearch = !searchVal || (l.title && l.title.toLowerCase().includes(searchVal)) || (l.content && l.content.toLowerCase().includes(searchVal));
        return matchCat && matchSearch;
    });

    if (listContainer) {
        if (filtered.length === 0) {
            listContainer.innerHTML = editable
                ? `<p style="font-size:12px; color:rgba(139,90,43,0.7); padding:14px; text-align:center;">まだ用語や設定がありません。<br>右上の「＋ 新規登録」から追加できます！</p>`
                : `<p style="font-size:12px; color:rgba(139,90,43,0.7); padding:14px; text-align:center;">まだ公開されている用語・設定がありません。</p>`;
        } else {
            listContainer.innerHTML = filtered.map(l => `
                <div class="lore-index-item ${String(selectedLoreId) === String(l.id) ? 'active' : ''}" onclick="selectLoreItem(${l.id})" style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="flex:1; overflow:hidden;">
                        <div style="font-size:13px; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHTML(l.title)}</div>
                        <div style="font-size:11px; opacity:0.75;">${escapeHTML(l.world || "共通")} / ${escapeHTML(l.category || "用語")}</div>
                    </div>
                    ${editable ? `<button type="button" onclick="deleteLoreById(${l.id}, event)" title="削除" style="background:none; border:none; color:var(--danger); cursor:pointer; font-size:13px; padding:2px 6px;">✕</button>` : ""}
                </div>
            `).join("");
        }
    }

    const emptyView = document.getElementById("loreEmptyView");
    const detailView = document.getElementById("loreDetailView");
    if (selectedLoreId != null && !worldLore.some(l => String(l.id) === String(selectedLoreId))) {
        selectedLoreId = null;
        if (detailView) detailView.style.display = "none";
        if (emptyView) emptyView.style.display = "flex";
    }
}
window.renderLoreEntries = renderLoreEntries;

function filterLoreCat(cat) {
    currentLoreCat = cat;
    renderLoreEntries();
}
window.filterLoreCat = filterLoreCat;

function selectLoreItem(id) {
    selectedLoreId = id;
    const item = worldLore.find(l => String(l.id) === String(id));
    const emptyView = document.getElementById("loreEmptyView");
    const detailView = document.getElementById("loreDetailView");
    if (!item || !detailView) return;

    if (emptyView) emptyView.style.display = "none";
    detailView.style.display = "block";

    document.getElementById("loreDetailTitle").textContent = item.title;
    document.getElementById("loreDetailWorld").textContent = item.world || "世界線未設定";
    document.getElementById("loreDetailCategory").textContent = item.category || "用語";
    document.getElementById("loreDetailReading").textContent = item.reading || "";
    document.getElementById("loreDetailContent").textContent = item.content;

    const imgContainer = document.getElementById("loreDetailImageContainer");
    const imgEl = document.getElementById("loreDetailImg");
    if (item.image) {
        if (imgEl) imgEl.src = item.image;
        if (imgContainer) imgContainer.style.display = "block";
    } else {
        if (imgContainer) imgContainer.style.display = "none";
    }

    renderLoreEntries();
}
window.selectLoreItem = selectLoreItem;

function setLoreEditWorld(val) {
    const input = document.getElementById("loreEditWorld");
    if (input) input.value = val;
}
window.setLoreEditWorld = setLoreEditWorld;

function openLoreEditor(id = null) {
    if (!canEditCurrentPage()) return;
    editLoreId = id;
    const modal = document.getElementById("loreEditorModal");
    const title = document.getElementById("loreEditorModalTitle");
    if (!modal) return;

    tempLoreImageBase64 = null;
    const preview = document.getElementById("loreEditImagePreview");
    if (preview) preview.innerHTML = "";

    const worldSuggestions = document.getElementById("loreWorldSuggestions");
    const quickPick = document.getElementById("loreWorldQuickPick");
    const worlds = [...new Set(
        characters
            .flatMap(c => [c.world, ...(Array.isArray(c.tag) ? c.tag : [])])
            .filter(Boolean)
    )];

    if (worldSuggestions) {
        worldSuggestions.innerHTML = worlds.map(w => `<option value="${escapeHTML(w)}">`).join("");
    }
    if (quickPick) {
        quickPick.innerHTML = worlds.length > 0
            ? worlds.map(w => `<button type="button" class="world-tag-btn" onclick="setLoreEditWorld('${escapeHTML(w)}')">${escapeHTML(w)}</button>`).join(" ")
            : `<span style="font-size:11px; color:var(--text-muted);">まだキャラの世界線がありません</span>`;
    }

    if (id) {
        const item = worldLore.find(l => String(l.id) === String(id));
        if (item) {
            title.textContent = "用語・設定の編集";
            document.getElementById("loreEditWorld").value = item.world || "";
            document.getElementById("loreEditCategory").value = item.category || "";
            document.getElementById("loreEditTitle").value = item.title || "";
            document.getElementById("loreEditReading").value = item.reading || "";
            document.getElementById("loreEditContent").value = item.content || "";
            tempLoreImageBase64 = item.image || null;
            if (item.image && preview) preview.innerHTML = `<img src="${item.image}" style="max-width:120px; border-radius:4px;">`;
        }
    } else {
        title.textContent = "新しい用語・設定の登録";
        document.getElementById("loreEditWorld").value = "";
        document.getElementById("loreEditCategory").value = "";
        document.getElementById("loreEditTitle").value = "";
        document.getElementById("loreEditReading").value = "";
        document.getElementById("loreEditContent").value = "";
    }

    const fileInput = document.getElementById("loreEditImageFile");
    if (fileInput) {
        fileInput.value = "";
        fileInput.onchange = async (e) => {
            if (e.target.files && e.target.files[0]) {
                tempLoreImageBase64 = await compressImage(e.target.files[0], 720);
                if (preview) preview.innerHTML = `<img src="${tempLoreImageBase64}" style="max-width:120px; border-radius:4px;">`;
            }
        };
    }

    modal.style.display = "flex";
}
window.openLoreEditor = openLoreEditor;

function closeLoreEditor() {
    const modal = document.getElementById("loreEditorModal");
    if (modal) modal.style.display = "none";
}
window.closeLoreEditor = closeLoreEditor;

function saveLoreEntry() {
    if (!canEditCurrentPage()) return;
    const title = document.getElementById("loreEditTitle").value.trim();
    if (!title) return alert("用語・項目名を入力してください！");

    const entry = {
        id: editLoreId || Date.now(),
        world: document.getElementById("loreEditWorld").value.trim() || "共通",
        category: document.getElementById("loreEditCategory").value.trim() || "用語",
        title: title,
        reading: document.getElementById("loreEditReading").value.trim(),
        content: document.getElementById("loreEditContent").value.trim(),
        image: tempLoreImageBase64 || null
    };

    if (editLoreId) {
        const idx = worldLore.findIndex(l => String(l.id) === String(editLoreId));
        if (idx !== -1) worldLore[idx] = entry;
    } else {
        worldLore.unshift(entry);
    }

    localStorage.setItem(getLoreStorageKey(), JSON.stringify(worldLore));
    syncLoreToCloud();
    closeLoreEditor();
    selectLoreItem(entry.id);
    renderLoreEntries();
}
window.saveLoreEntry = saveLoreEntry;

async function syncLoreToCloud() {
    const pageId = new URLSearchParams(window.location.search).get('id');
    const user = auth.currentUser;
    if (pageId && user && (!currentPageAuthorId || user.uid === currentPageAuthorId)) {
        try {
            await db.collection("pages").doc(pageId).set({
                worldLore: JSON.stringify(worldLore)
            }, { merge: true });
        } catch (err) {
            console.error("Lore cloud sync error:", err);
            alert("用語事典のクラウド保存に失敗しました（画像容量が大きすぎる可能性があります）。");
        }
    }
}

function editCurrentLore() {
    if (!canEditCurrentPage()) return;
    if (selectedLoreId) openLoreEditor(selectedLoreId);
}
window.editCurrentLore = editCurrentLore;

function deleteCurrentLore() {
    if (!canEditCurrentPage()) return;
    if (!selectedLoreId && selectedLoreId !== 0) return;
    if (!confirm("この項目を事典から削除しますか？")) return;
    worldLore = worldLore.filter(l => String(l.id) !== String(selectedLoreId));
    localStorage.setItem(getLoreStorageKey(), JSON.stringify(worldLore));
    syncLoreToCloud();
    selectedLoreId = null;
    const detailView = document.getElementById("loreDetailView");
    const emptyView = document.getElementById("loreEmptyView");
    if (detailView) detailView.style.display = "none";
    if (emptyView) emptyView.style.display = "flex";
    renderLoreEntries();
}
window.deleteCurrentLore = deleteCurrentLore;

function deleteLoreById(id, e) {
    if (e) e.stopPropagation();
    if (!canEditCurrentPage()) return;
    if (!confirm("この項目を事典から削除しますか？")) return;
    worldLore = worldLore.filter(l => String(l.id) !== String(id));
    localStorage.setItem(getLoreStorageKey(), JSON.stringify(worldLore));
    syncLoreToCloud();
    if (String(selectedLoreId) === String(id)) {
        selectedLoreId = null;
        const detailView = document.getElementById("loreDetailView");
        const emptyView = document.getElementById("loreEmptyView");
        if (detailView) detailView.style.display = "none";
        if (emptyView) emptyView.style.display = "flex";
    }
    renderLoreEntries();
}
window.deleteLoreById = deleteLoreById;

// =========================================
// 小説・ストーリー（縦書き・読書シアター）
// =========================================
let novelWritingMode = "vertical";
let novelFontSize = 17;

function toggleNovelWritingMode() {
    novelWritingMode = novelWritingMode === "vertical" ? "horizontal" : "vertical";
    applyNovelWritingModeUI();
}
window.toggleNovelWritingMode = toggleNovelWritingMode;

function setNovelWritingMode(mode) {
    novelWritingMode = mode;
    applyNovelWritingModeUI();
}
window.setNovelWritingMode = setNovelWritingMode;

function applyNovelWritingModeUI() {
    const wrapper = document.getElementById("novel-theater-wrapper");
    const vBtn = document.getElementById("novelWritingModeBtn");
    const hBtn = document.getElementById("novelHorizontalModeBtn");
    if (!wrapper) return;

    if (novelWritingMode === "vertical") {
        wrapper.classList.add("vertical-mode");
        if (vBtn) vBtn.classList.add("active");
        if (hBtn) hBtn.classList.remove("active");
    } else {
        wrapper.classList.remove("vertical-mode");
        if (vBtn) vBtn.classList.remove("active");
        if (hBtn) hBtn.classList.add("active");
    }
}

function adjustNovelFontSize(delta) {
    novelFontSize = Math.max(12, Math.min(32, novelFontSize + delta));
    const textarea = document.getElementById("novel-output");
    if (textarea) textarea.style.fontSize = `${novelFontSize}px`;
}
window.adjustNovelFontSize = adjustNovelFontSize;

function setNovelPaperTheme(theme) {
    const wrapper = document.getElementById("novel-theater-wrapper");
    if (!wrapper) return;
    wrapper.className = `novel-theater-wrapper paper-${theme} ${novelWritingMode === 'vertical' ? 'vertical-mode' : ''}`;
    document.querySelectorAll(".paper-color-dot").forEach(dot => {
        dot.classList.toggle("active", dot.classList.contains(`paper-${theme}`));
    });
}
window.setNovelPaperTheme = setNovelPaperTheme;

// =========================================
// 入力フォームのタブ切り替え
// =========================================
function switchFormTab(tabId) {
    document.querySelectorAll(".form-tab-btn").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("onclick").includes(tabId));
    });
    document.querySelectorAll(".form-tab-content").forEach(content => {
        content.classList.toggle("active", content.id === tabId);
    });
}
window.switchFormTab = switchFormTab;

// =========================================
// 検索バーのリアルタイムキャラサジェスト
// =========================================
function setupSearchSuggest() {
    const input = document.getElementById("search");
    const popup = document.getElementById("searchSuggestPopup");
    if (!input || !popup) return;

    input.addEventListener("input", () => {
        const val = input.value.trim().toLowerCase();
        if (!val) {
            popup.style.display = "none";
            return;
        }

        const hits = characters.filter(c => !c.deletedAt && (
            (c.name && c.name.toLowerCase().includes(val)) ||
            (c.world && c.world.toLowerCase().includes(val)) ||
            (c.personality && c.personality.toLowerCase().includes(val))
        )).slice(0, 6);

        if (hits.length === 0) {
            popup.style.display = "none";
            return;
        }

        popup.innerHTML = hits.map(c => {
            const thumbInfo = getCharThumbnailInfo(c);
            const imgStyle = getCharAvatarImgStyle(c);
            return `
                <div class="suggest-item" onclick="jumpToCharacterCard(${c.id})">
                    ${thumbInfo.url ? `<img src="${escapeHTML(thumbInfo.url)}" class="suggest-thumb" style="${imgStyle}">` : `<div class="suggest-thumb" style="display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--text-muted);">[IMG]</div>`}
                    <div>
                        <div class="suggest-name">${escapeHTML(c.name)}</div>
                        <div class="suggest-world">${escapeHTML(c.world || "世界線未設定")}</div>
                    </div>
                </div>
            `;
        }).join("");
        popup.style.display = "block";
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-input-wrapper")) {
            popup.style.display = "none";
        }
    });
}

function jumpToCharacterCard(id) {
    const popup = document.getElementById("searchSuggestPopup");
    if (popup) popup.style.display = "none";
    openCharacterDetail(id);
}
window.jumpToCharacterCard = jumpToCharacterCard;

// =========================================
// ログイン・認証
// =========================================
function loginWithGoogle() {
    auth.signInWithPopup(provider).then((result) => {
        alert(`ログインに成功しました。ようこそ、${result.user.displayName}さん。`);
    }).catch((error) => {
        console.error("Firebase Login Error:", error);
        if (error.code === "auth/unauthorized-domain") {
            const domain = window.location.hostname;
            alert(`【ドメイン未承認エラー】\n現在のURLドメイン「${domain}」がFirebaseに許可されていません。\n\n▼ 解決方法：\n1. Firebaseコンソール (https://console.firebase.google.com/)\n2. [Authentication] ➔ [設定 (Settings)] ➔ [承認済みドメイン]\n3. 「ドメインを追加」から「${domain}」を追加してください。\n※また、プレビュー画面右上の「別タブで開く（↗）」から開くと成功する場合があります。`);
        } else if (error.code === "auth/popup-blocked") {
            alert("ブラウザによってポップアップがブロックされました。\nブラウザのアドレスバーのポップアップ許可アイコンをクリックして許可してください。\nまたは、画面右上の「別タブで開く」アイコンから開いてみてください。");
        } else if (error.code === "auth/cancelled-popup-request" || error.code === "auth/popup-closed-by-user") {
            // ユーザーが手動で閉じた場合は何もしない
        } else {
            alert(`ログインに失敗しました (${error.code || "不明"})\n${error.message || ""}\n\n※埋め込み画面（iFrame）の制限を受ける場合があるため、右上の「別タブで開く」もお試しください。`);
        }
    });
}
window.loginWithGoogle = loginWithGoogle;

async function goToMyPage() {
    const user = auth.currentUser;
    if (!user) return;
    try {
        const own = await db.collection("pages").doc(user.uid).get();
        if (own.exists) { window.location.href = `?id=${user.uid}`; return; }
        const snap = await db.collection("pages").where("authorId", "==", user.uid).limit(1).get();
        if (!snap.empty) { window.location.href = `?id=${snap.docs[0].id}`; return; }
        alert(t("header.noMyPage"));
    } catch (error) {
        alert(t("header.myPageFailed"));
    }
}
window.goToMyPage = goToMyPage;

function switchGoogleAccount() {
    localStorage.removeItem("isAdminMode");
    if (typeof checkAdminStatus === "function") checkAdminStatus();
    provider.setCustomParameters({ prompt: "select_account" });
    auth.signInWithPopup(provider).catch((error) => {
        if (error.code !== "auth/cancelled-popup-request" && error.code !== "auth/popup-closed-by-user") {
            alert(t("header.switchAccountFailed"));
        }
    });
}
window.switchGoogleAccount = switchGoogleAccount;

function logout() {
    localStorage.removeItem("isAdminMode");
    if (typeof checkAdminStatus === "function") checkAdminStatus();
    auth.signOut().then(() => alert("ログアウトしました。")).catch(console.error);
}
window.logout = logout;

function canEditCurrentPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const currentId = urlParams.get('id');
    const user = auth.currentUser;
    if (!currentId) return true;
    if (!user) return false;
    if (previewAsVisitor) return false;
    return currentPageAuthorId === null || user.uid === currentPageAuthorId;
}
window.canEditCurrentPage = canEditCurrentPage;

function syncRoleBasedPageControls() {
    const editable = canEditCurrentPage();

    const boardMenuLabel = document.getElementById("sidebarBoardMenuLabel");
    if (boardMenuLabel) {
        boardMenuLabel.textContent = editable ? "属性十字マップ＆ティア表" : "ティア表";
    }
    const dialogueMenu = document.getElementById("sidebarDialogueMenuItem");
    if (dialogueMenu) {
        dialogueMenu.style.display = (editable || dialogueConfig.isPublic !== false) ? "" : "none";
    }

    if (typeof renderPatDailySummary === "function") renderPatDailySummary();
    if (typeof renderLoreEntries === "function") renderLoreEntries();
    if (typeof applyBoardRoleUI === "function") applyBoardRoleUI();
    if (typeof applyDialogueRoleUI === "function") applyDialogueRoleUI();
    if (typeof renderHomeBirthdaySpotlight === "function") renderHomeBirthdaySpotlight();
    if (typeof updateNovelSelectors === "function") updateNovelSelectors();
    if (typeof renderTimelineEntries === "function") renderTimelineEntries();

    const relMapPage = document.getElementById("rel-map-page");
    if (relMapPage && relMapPage.style.display !== "none" && typeof renderRelationshipMap === "function") {
        renderRelationshipMap();
    }
    const boardPage = document.getElementById("board-page");
    if (boardPage && boardPage.style.display !== "none" && typeof renderBoard === "function") {
        renderBoard();
    }
    const heightPage = document.getElementById("height-compare-page");
    if (heightPage && heightPage.style.display !== "none" && typeof renderHeightComparison === "function") {
        renderHeightComparison();
    }
}

function updateViewMode() {
    const user = auth.currentUser; 
    const urlParams = new URLSearchParams(window.location.search);
    const currentId = urlParams.get('id');

    const toggleUI = (id, displayStyle) => {
        const el = document.getElementById(id);
        if (el) el.style.display = displayStyle;
    };
    const updateText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    };

    let styleTag = document.getElementById("visitor-mode-css");
    const applyBlock = (shouldBlock) => {
        const epTitle = document.getElementById("episode-title");
        const novOutput = document.getElementById("novel-output");
        if (epTitle) epTitle.readOnly = shouldBlock;
        if (novOutput) novOutput.readOnly = shouldBlock;

        if (shouldBlock) {
            if (!styleTag) {
                styleTag = document.createElement("style");
                styleTag.id = "visitor-mode-css";
                styleTag.innerHTML = `
                    .gallery-manager, .form, #form-fab, #addLoreEntryBtn, #loreDetailActions,
                    #trashButtonContainer, #trashPanel, #addTimelineEventBtn,
                    #novelSeriesVisibilityLabel, #novelEpisodeVisibilityLabel { display: none !important; }
                    button[onclick="createNewSeries()"], button[onclick="renameCurrentSeries()"], button[onclick="deleteCurrentSeries()"],
                    button[onclick="createNewEpisode()"], button[onclick="deleteCurrentEpisode()"],
                    button[onclick="generateNovelOnPage()"], button[onclick="saveNovelText()"] { display: none !important; }
                    #novel-theme { display: none !important; }
                    button[onclick^="editCharacter"], button[onclick^="deleteCharacter"] { display: none !important; }
                    button[onclick^="toggleFavorite"] { display: none !important; }
                    #sort option[value="favorite"] { display: none !important; }
                `;
                document.head.appendChild(styleTag);
            }
        } else {
            if (styleTag) { styleTag.remove(); styleTag = null; }
        }
    };

    if (!user) {
        toggleUI("login-btn", "inline-block"); 
        toggleUI("logout-btn", "none"); 
        toggleUI("switchAccountBtn", "none");
        toggleUI("myPageBtn", "none");
        toggleUI("publishBtn", "none");
        toggleUI("themeCustomizeBtn", "none");
        toggleUI("cheerInboxMenuBtn", "none");
        applyBlock(true); 
        updateText("loginStatus", currentId ? t("header.notLoggedIn") : t("header.pleaseLogin"));
        syncRoleBasedPageControls();
        return;
    }

    toggleUI("login-btn", "none"); 
    toggleUI("logout-btn", "inline-block"); 
    toggleUI("switchAccountBtn", "inline-block");
    const onOwnPage = !!(currentId && currentPageAuthorId && user.uid === currentPageAuthorId);
    toggleUI("myPageBtn", onOwnPage ? "none" : "inline-block");

    const isOwner = !currentId || currentPageAuthorId === null || user.uid === currentPageAuthorId;

    if (isOwner && !previewAsVisitor) {
        updateText("loginStatus", currentId ? (myProfileName || "作者空間") : "");
        applyBlock(false);
        toggleUI("publishBtn", "inline-block");
        toggleUI("themeCustomizeBtn", isOwner && currentId ? "inline-flex" : "none");
        toggleUI("cheerInboxMenuBtn", isOwner && currentId ? "flex" : "none");
        toggleUI("previewToggleBtn", isOwner && currentId ? "inline-block" : "none");
        updateText("previewToggleBtn", t("js.previewAsVisitor"));
        toggleUI("settingsGearBtn", isOwner && currentId ? "inline-flex" : "none");
    } else if (isOwner && previewAsVisitor) {
        updateText("loginStatus", t("js.previewMode"));
        toggleUI("publishBtn", "none");
        toggleUI("themeCustomizeBtn", "none");
        toggleUI("cheerInboxMenuBtn", "none");
        applyBlock(true);
        toggleUI("previewToggleBtn", "inline-block");
        updateText("previewToggleBtn", t("js.backToEdit"));
        toggleUI("settingsGearBtn", "none");
    } else {
        updateText("loginStatus", t("js.viewMode"));
        toggleUI("publishBtn", "none");
        toggleUI("themeCustomizeBtn", "none");
        toggleUI("cheerInboxMenuBtn", "none");
        toggleUI("previewToggleBtn", "none");
        toggleUI("settingsGearBtn", "none");
        applyBlock(true); 
    }

    syncRoleBasedPageControls();
    if (typeof display === "function") display();
}
window.updateViewMode = updateViewMode;

let previewAsVisitor = false;
function togglePreviewMode() {
    previewAsVisitor = !previewAsVisitor;
    updateViewMode();
}
window.togglePreviewMode = togglePreviewMode;

function openSettingsPanel() {
    const panel = document.getElementById("settingsPanel");
    if (!panel) return;
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('id');
    if (pageId) {
        db.collection("pages").doc(pageId).get().then(doc => {
            const visibility = (doc.exists && doc.data().visibility) || "public";
            const targetId = visibility === "unlisted" ? "visibilityUnlisted" : "visibilityPublic";
            const radio = document.getElementById(targetId);
            if (radio) radio.checked = true;
        }).catch(console.error);
    }
    panel.style.display = "flex";
}
window.openSettingsPanel = openSettingsPanel;

function closeSettingsPanel() {
    const panel = document.getElementById("settingsPanel");
    if (panel) panel.style.display = "none";
}
window.closeSettingsPanel = closeSettingsPanel;

async function saveSettingsPanel() {
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('id');
    const user2 = auth.currentUser;
    if (!pageId || !user2) return;

    const unlistedRadio = document.getElementById("visibilityUnlisted");
    const visibility = (unlistedRadio && unlistedRadio.checked) ? "unlisted" : "public";

    try {
        await db.collection("pages").doc(pageId).set({ visibility: visibility }, { merge: true });
        closeSettingsPanel();
        alert(t("settings.saved"));
    } catch (error) {
        alert(t("settings.saveFailed"));
    }
}
window.saveSettingsPanel = saveSettingsPanel;

let myProfileName = null;
async function loadMyProfileName(uid) {
    try {
        const doc = await db.collection("profiles").doc(uid).get();
        myProfileName = (doc.exists && doc.data().name) ? doc.data().name : null;
    } catch (e) {
        myProfileName = null;
    }
}

auth.onAuthStateChanged(async (user) => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentId = urlParams.get('id');
    if (user) {
        await loadMyProfileName(user.uid);
    } else {
        myProfileName = null;
    }
    if (currentId && typeof loadPageData === "function") {
        await loadPageData();
    }
    togglePageVisibility();
    updateViewMode();
    if (typeof checkAdminStatus === "function") checkAdminStatus();
});

// =========================================
// キャラクターデータ・管理ロジック
// =========================================
let characters = [];
let galleryImages = [];
let tempLinks = [];
let mainExpressions = [];
let tempImages = []; 
let tempCharGallery = [];
let tempRelations = []; 
let editId = null; 

let currentNovelWorld = "";
let currentNovelGroup = "";
let currentNovelCharId = null;
let currentSeriesIdx = -1;  
let currentEpisodeIdx = -1; 

function escapeHTML(str) {
    if (!str) return "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getCharThumbnailInfo(c) {
    if (!c) return { url: "", isFallback: false, position: "center" };
    if (c.iconUrl) {
        return { url: c.iconUrl, isFallback: false, position: "center" };
    }
    const firstImg = c.images && c.images[0] && c.images[0].url ? c.images[0].url : "";
    return {
        url: firstImg,
        isFallback: !!firstImg,
        position: c.imagePosition || "center"
    };
}

function getCharAvatarImgStyle(c) {
    const info = getCharThumbnailInfo(c);
    if (!info.isFallback) return "object-fit:cover;object-position:center;";
    if (info.position === "contain") {
        return "object-fit:contain;object-position:center;background:rgba(148,163,184,0.12);";
    }
    const validPos = (info.position === "top" || info.position === "bottom") ? info.position : "center";
    return `object-fit:cover;object-position:center ${validPos};`;
}

function getCharAvatarBgInlineStyle(c) {
    const info = getCharThumbnailInfo(c);
    if (!info.url) return "background:var(--primary);";
    const safeUrl = info.url.replace(/'/g, "\\'");
    if (!info.isFallback) {
        return `background-image:url('${safeUrl}');background-size:cover;background-position:center;background-repeat:no-repeat;`;
    }
    if (info.position === "contain") {
        return `background-image:url('${safeUrl}');background-size:contain;background-position:center;background-repeat:no-repeat;background-color:var(--card-bg-solid);`;
    }
    const validPos = (info.position === "top" || info.position === "bottom") ? info.position : "center";
    return `background-image:url('${safeUrl}');background-size:cover;background-position:center ${validPos};background-repeat:no-repeat;`;
}

function applyCharAvatarBgToElement(el, c) {
    if (!el) return;
    const info = getCharThumbnailInfo(c);
    if (!info.url) {
        el.style.backgroundImage = "";
        return;
    }
    el.style.backgroundImage = `url("${info.url}")`;
    el.style.backgroundRepeat = "no-repeat";
    if (!info.isFallback) {
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = "center";
        return;
    }
    if (info.position === "contain") {
        el.style.backgroundSize = "contain";
        el.style.backgroundPosition = "center";
        el.style.backgroundColor = "var(--card-bg-solid)";
    } else {
        const validPos = (info.position === "top" || info.position === "bottom") ? info.position : "center";
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = `center ${validPos}`;
    }
}

function parseBirthdayMonthDay(birthdayStr) {
    if (!birthdayStr) return null;
    const normalized = String(birthdayStr)
        .replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
        .replace(/[／．]/g, "/")
        .replace(/^\s*\d{4}\s*[年/\-\.]\s*/, "");
    const match = normalized.match(/(\d{1,2})\s*[/\-\.月]\s*(\d{1,2})/);
    if (!match) return null;
    const month = parseInt(match[1], 10);
    const day = parseInt(match[2], 10);
    if (month < 1 || month > 12 || day < 1 || day > 31) return null;
    return { month, day };
}

function getDaysUntilBirthday(month, day) {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let nextBday = new Date(now.getFullYear(), month - 1, day);
    if (nextBday < todayStart) {
        nextBday = new Date(now.getFullYear() + 1, month - 1, day);
    }
    return Math.round((nextBday - todayStart) / 86400000);
}

function renderHomeBirthdaySpotlight() {
    const box = document.getElementById("homeBirthdaySpotlight");
    if (!box) return;
    const pool = typeof getVisibleCharacters === "function" ? getVisibleCharacters() : [];
    const withBirthdays = pool
        .map(c => ({ char: c, md: parseBirthdayMonthDay(c.birthday) }))
        .filter(item => item.md !== null)
        .map(item => ({
            ...item,
            diffDays: getDaysUntilBirthday(item.md.month, item.md.day)
        }))
        .sort((a, b) => a.diffDays - b.diffDays);

    if (withBirthdays.length === 0) {
        box.style.display = "none";
        box.innerHTML = "";
        return;
    }

    const todays = withBirthdays.filter(x => x.diffDays === 0);
    const makeChip = (c) => {
        const thumbInfo = getCharThumbnailInfo(c);
        const imgHtml = thumbInfo.url ? `<img src="${escapeHTML(thumbInfo.url)}" alt="" style="${getCharAvatarImgStyle(c)}">` : "";
        return `<span class="birthday-spotlight-chip" onclick="openCharacterDetail(${c.id})">${imgHtml}${escapeHTML(c.name)}</span>`;
    };

    box.style.display = "flex";
    if (todays.length > 0) {
        box.classList.add("is-today-celebration");
        const chipsHtml = todays.map(x => makeChip(x.char)).join(" ");
        box.innerHTML = `
            <div class="birthday-spotlight-main">
                <span>今日は</span>
                ${chipsHtml}
                <span>の誕生日だよ！</span>
            </div>
            <button type="button" class="header-btn secondary" style="padding:5px 12px; font-size:12px;" onclick="openBirthdayCalendarModal()">誕生日カレンダー</button>
        `;
    } else {
        box.classList.remove("is-today-celebration");
        const minDiff = withBirthdays[0].diffDays;
        const upcoming = withBirthdays.filter(x => x.diffDays === minDiff);
        const md = upcoming[0].md;
        const chipsHtml = upcoming.map(x => makeChip(x.char)).join(" ");
        box.innerHTML = `
            <div class="birthday-spotlight-main">
                <span>あと <strong>${minDiff}日</strong>（${md.month}月${md.day}日）で</span>
                ${chipsHtml}
                <span>の誕生日！</span>
            </div>
            <button type="button" class="header-btn secondary" style="padding:5px 12px; font-size:12px;" onclick="openBirthdayCalendarModal()">誕生日カレンダー</button>
        `;
    }
}
window.renderHomeBirthdaySpotlight = renderHomeBirthdaySpotlight;

function openBirthdayCalendarModal() {
    const modal = document.getElementById("birthdayCalendarModal");
    if (!modal) return;
    renderBirthdayCalendar();
    modal.style.display = "flex";
}
window.openBirthdayCalendarModal = openBirthdayCalendarModal;

function closeBirthdayCalendarModal() {
    const modal = document.getElementById("birthdayCalendarModal");
    if (modal) modal.style.display = "none";
}
window.closeBirthdayCalendarModal = closeBirthdayCalendarModal;

function renderBirthdayCalendar() {
    const grid = document.getElementById("birthdayCalendarGrid");
    const summaryEl = document.getElementById("birthdayCalendarSummary");
    const worldSelect = document.getElementById("birthdayCalWorldFilter");
    if (!grid) return;

    const pool = typeof getVisibleCharacters === "function" ? getVisibleCharacters() : [];
    if (worldSelect) {
        const prev = worldSelect.value;
        const worlds = [...new Set(pool.map(c => c.world).filter(Boolean))];
        worldSelect.innerHTML = `<option value="">すべての世界線</option>` +
            worlds.map(w => `<option value="${escapeHTML(w)}">${escapeHTML(w)}</option>`).join("");
        if (prev && worlds.includes(prev)) worldSelect.value = prev;
    }

    const selectedWorld = worldSelect ? worldSelect.value : "";
    const filtered = pool.filter(c => !selectedWorld || c.world === selectedWorld);

    const now = new Date();
    const curMonth = now.getMonth() + 1;
    const curDay = now.getDate();

    const byMonth = Array.from({ length: 12 }, () => []);
    let registeredCount = 0;
    filtered.forEach(c => {
        const md = parseBirthdayMonthDay(c.birthday);
        if (!md) return;
        registeredCount++;
        byMonth[md.month - 1].push({ char: c, day: md.day, month: md.month });
    });

    if (summaryEl) {
        summaryEl.textContent = `誕生日が登録されているキャラクター: ${registeredCount}人`;
    }

    grid.innerHTML = byMonth.map((entries, mIdx) => {
        const monthNum = mIdx + 1;
        const sorted = [...entries].sort((a, b) => a.day - b.day);
        const listHtml = sorted.length === 0
            ? `<div style="font-size:11px; color:var(--text-muted); padding:4px 0;">登録なし</div>`
            : sorted.map(item => {
                const isToday = (monthNum === curMonth && item.day === curDay);
                const thumbInfo = getCharThumbnailInfo(item.char);
                return `
                    <div class="birthday-month-entry ${isToday ? 'is-today' : ''}" onclick="closeBirthdayCalendarModal(); openCharacterDetail(${item.char.id})">
                        <span class="birthday-day-tag">${item.day}日</span>
                        ${thumbInfo.url ? `<img src="${escapeHTML(thumbInfo.url)}" alt="" style="${getCharAvatarImgStyle(item.char)}">` : ''}
                        <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${escapeHTML(item.char.name)}</span>
                    </div>
                `;
            }).join("");

        return `
            <div class="birthday-month-card ${monthNum === curMonth ? 'is-current-month' : ''}">
                <div class="birthday-month-header">
                    <span>${monthNum}月</span>
                    <span style="font-size:11px; color:var(--text-muted);">${sorted.length}人</span>
                </div>
                ${listHtml}
            </div>
        `;
    }).join("");
}
window.renderBirthdayCalendar = renderBirthdayCalendar;

function checkTodaysBirthdays() {
    const pool = typeof getVisibleCharacters === "function" ? getVisibleCharacters() : characters;
    if (!Array.isArray(pool) || pool.length === 0) return;
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

    const birthdayChars = pool.filter(c => {
        const md = parseBirthdayMonthDay(c.birthday);
        return md && md.month === todayMonth && md.day === todayDay;
    });
    if (birthdayChars.length === 0) return;

    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('id') || "local";
    const shownKey = `birthdayShown_${pageId}_${today.getFullYear()}-${todayMonth}-${todayDay}`;
    if (sessionStorage.getItem(shownKey) === "true") return;
    sessionStorage.setItem(shownKey, "true");

    const popup = document.getElementById("birthdayPopup");
    const content = document.getElementById("birthdayPopupContent");
    if (!popup || !content) return;

    content.innerHTML = birthdayChars.map(c => {
        const thumbInfo = getCharThumbnailInfo(c);
        const avatarHtml = thumbInfo.url
            ? `<img src="${escapeHTML(thumbInfo.url)}" alt="" style="width:42px; height:42px; border-radius:50%; border:2px solid var(--primary); ${getCharAvatarImgStyle(c)}">`
            : "";
        return `<div style="display:flex; align-items:center; justify-content:center; gap:10px; font-size: 20px; font-weight: 800; margin: 8px 0; color: var(--primary);">${avatarHtml}<span>${escapeHTML(c.name)}</span></div>`;
    }).join("");

    popup.style.display = "flex";
}

function closeBirthdayPopup() {
    const popup = document.getElementById("birthdayPopup");
    if (popup) popup.style.display = "none";
}
window.closeBirthdayPopup = closeBirthdayPopup;

async function loadPageData() {
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('id');
    if (!pageId) return;

    try {
        const doc = await db.collection("pages").doc(pageId).get();
        if (doc.exists) {
            const data = doc.data();

            const charSnapshot = await db.collection("pages").doc(pageId).collection("characters").get();
            characters = [];
            charSnapshot.forEach(charDoc => characters.push(charDoc.data()));

            if (characters.length === 0) {
                if (data.charactersJson) characters = JSON.parse(data.charactersJson) || [];
                else if (data.characters) characters = data.characters || [];
            }

            const gallerySnapshot = await db.collection("pages").doc(pageId).collection("galleryImages").get();
            galleryImages = [];
            gallerySnapshot.forEach(imgDoc => galleryImages.push(imgDoc.data()));
            galleryImages.sort((a, b) => (a.order || 0) - (b.order || 0));

            if (galleryImages.length === 0) {
                if (data.galleryImagesJson) galleryImages = JSON.parse(data.galleryImagesJson) || [];
                else if (data.galleryImages) galleryImages = data.galleryImages || [];
            }

            try {
                const cheersSnap = await db.collection("pages").doc(pageId).collection("cheers").orderBy("id", "desc").get();
                fanCheerMessages = [];
                cheersSnap.forEach(d => fanCheerMessages.push(d.data()));
            } catch (e) {}

            if (data.worldLore) {
                try {
                    worldLore = typeof data.worldLore === "string" ? JSON.parse(data.worldLore) : data.worldLore;
                    localStorage.setItem(getLoreStorageKey(), JSON.stringify(worldLore));
                } catch(e) { worldLore = []; }
            } else {
                const isAuthorOwn = !!(auth.currentUser && data.authorId === auth.currentUser.uid);
                const cached = isAuthorOwn ? (localStorage.getItem(getLoreStorageKey()) || localStorage.getItem("world_lore")) : null;
                if (cached) {
                    try { worldLore = JSON.parse(cached) || []; } catch (_) { worldLore = []; }
                } else {
                    worldLore = [];
                }
            }
            if (data.boardData) {
                try {
                    const parsedBoard = typeof data.boardData === "string" ? JSON.parse(data.boardData) : data.boardData;
                    if (parsedBoard.matrix) boardConfig.matrix = normalizeMatrixConfig(parsedBoard.matrix);
                    if (parsedBoard.tier) boardConfig.tier = normalizeTierConfig(parsedBoard.tier);
                    localStorage.setItem(`board_data_${pageId}`, JSON.stringify(boardConfig));
                } catch(e) {}
            } else {
                boardConfig = {
                    matrix: normalizeMatrixConfig(null),
                    tier: normalizeTierConfig(null)
                };
            }
            if (data.relMapData) {
                try {
                    relMapPositions = typeof data.relMapData === "string" ? JSON.parse(data.relMapData) : data.relMapData;
                    localStorage.setItem(`rel_map_positions_${pageId}`, JSON.stringify(relMapPositions));
                } catch (e) { relMapPositions = {}; }
            } else {
                relMapPositions = {};
            }
            if (data.timelineData) {
                try {
                    timelineEvents = typeof data.timelineData === "string" ? JSON.parse(data.timelineData) : data.timelineData;
                    if (!Array.isArray(timelineEvents)) timelineEvents = [];
                    localStorage.setItem(getTimelineStorageKey(), JSON.stringify(timelineEvents));
                } catch (e) { timelineEvents = []; }
            } else {
                const isAuthorOwn = !!(auth.currentUser && data.authorId === auth.currentUser.uid);
                const cachedTimeline = isAuthorOwn ? localStorage.getItem(getTimelineStorageKey()) : null;
                if (cachedTimeline) {
                    try { timelineEvents = JSON.parse(cachedTimeline) || []; } catch (_) { timelineEvents = []; }
                } else {
                    timelineEvents = [];
                }
            }
            if (data.heightAdjustData) {
                try {
                    heightArtAdjustments = typeof data.heightAdjustData === "string" ? JSON.parse(data.heightAdjustData) : data.heightAdjustData;
                    if (!heightArtAdjustments || typeof heightArtAdjustments !== "object") heightArtAdjustments = {};
                    localStorage.setItem(getHeightAdjustStorageKey(), JSON.stringify(heightArtAdjustments));
                } catch (e) { heightArtAdjustments = {}; }
            } else {
                loadHeightAdjustments();
            }

            if (data.dialogueData) {
                try {
                    const parsedDlg = typeof data.dialogueData === "string" ? JSON.parse(data.dialogueData) : data.dialogueData;
                    dialogueConfig = normalizeDialogueConfig(parsedDlg);
                    syncDialogueMessagesRef();
                    localStorage.setItem(`dialogue_data_${pageId}`, JSON.stringify(dialogueConfig));
                } catch (e) {
                    dialogueConfig = normalizeDialogueConfig(null);
                    syncDialogueMessagesRef();
                }
            } else {
                dialogueConfig = normalizeDialogueConfig(null);
                syncDialogueMessagesRef();
            }

            const today = getTodayDateKey();
            const yesterday = getYesterdayDateKey();
            loadLocalDailyPatStats();
            if (data.dailyPatStatsByDate && data.dailyPatStatsByDate[today]) {
                const cloudToday = data.dailyPatStatsByDate[today];
                const cloudTotal = Number(cloudToday.total) || 0;
                const cloudChars = cloudToday.chars && typeof cloudToday.chars === "object" ? cloudToday.chars : {};
                dailyPatStats.date = today;
                dailyPatStats.total = Math.max(Number(dailyPatStats.total) || 0, cloudTotal);
                Object.entries(cloudChars).forEach(([cid, cnt]) => {
                    dailyPatStats.chars[cid] = Math.max(Number(dailyPatStats.chars[cid]) || 0, Number(cnt) || 0);
                });
                saveLocalDailyPatStats();
            }

            if (hasIncrementedVisitorCounter) {
                const dailyVisitors = data.dailyVisitorStatsByDate || {};
                const syncedTotal = Math.max(Number(latestVisitorDisplay.total) || 0, Number(data.visitorCount) || 0);
                const syncedToday = Math.max(Number(latestVisitorDisplay.today) || 0, Number(dailyVisitors[today]) || 0);
                const syncedYesterday = Math.max(Number(latestVisitorDisplay.yesterday) || 0, Number(dailyVisitors[yesterday]) || 0);
                renderCounterStrip(syncedTotal, syncedToday, syncedYesterday);
            }

            if (data.themeSettings) {
                try {
                    const parsedTheme = typeof data.themeSettings === "string" ? JSON.parse(data.themeSettings) : data.themeSettings;
                    if (parsedTheme.bgColor) localStorage.setItem("custom_theme_bgcolor", parsedTheme.bgColor);
                    if (parsedTheme.bgImage) localStorage.setItem("custom_theme_bg", parsedTheme.bgImage);
                    if (parsedTheme.bgFit) localStorage.setItem("custom_theme_bg_fit", parsedTheme.bgFit);
                    if (parsedTheme.worldThemes) localStorage.setItem("custom_world_themes", parsedTheme.worldThemes);
                    if (typeof applyCustomTheme === "function") applyCustomTheme();
                } catch(e) {}
            }

            currentPageAuthorId = data.authorId;
        } else {
            alert("このURLのページは存在しません。代わりに端末内のデータを読み込みます。");
            const localChars = localStorage.getItem("characters");
            if (localChars) characters = JSON.parse(localChars);
            const localGallery = localStorage.getItem("gallery_images");
            if (localGallery) galleryImages = JSON.parse(localGallery);
            currentPageAuthorId = null;
        }
    } catch (error) {
        console.error("データ読み込みエラー:", error);
    }

    updateViewMode();
    await purgeOldTrash();
    if (typeof display === "function") display();
    if (typeof initGallerySlider === "function") initGallerySlider();
    if (typeof renderLoreEntries === "function") renderLoreEntries();
    if (typeof renderPatDailySummary === "function") renderPatDailySummary();
    if (typeof updateDialogueActors === "function") updateDialogueActors();
    if (typeof renderDialogueTimeline === "function") renderDialogueTimeline();
    if (typeof renderHomeBirthdaySpotlight === "function") renderHomeBirthdaySpotlight();
    if (typeof renderTimelineEntries === "function") renderTimelineEntries();
    if (typeof renderHeightComparison === "function") renderHeightComparison();
    checkTodaysBirthdays();
}
window.loadPageData = loadPageData;

window.addEventListener('load', async () => {
    applyTranslations();
    initTheme();
    loadLoreData();
    loadTimelineData();
    loadHeightAdjustments();
    loadDialogueData();
    loadLocalDailyPatStats();
    setupSearchSuggest();
    setupPatPatInteraction();
    checkTutorial();

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const pageId = urlParams.get('id');

        if (pageId) {
            await loadPageData();
        } else {
            const localChars = localStorage.getItem("characters");
            if (localChars) characters = JSON.parse(localChars);
            const localGallery = localStorage.getItem("gallery_images");
            if (localGallery) galleryImages = JSON.parse(localGallery);
            const localCheers = localStorage.getItem("fan_cheers");
            if (localCheers) fanCheerMessages = JSON.parse(localCheers);
            await purgeOldTrash();
        }
    } catch (error) {
        console.error("初期化エラー:", error);
    }

    if (typeof switchPage === "function") switchPage('home-page');
    if (typeof display === "function") display();
    if (typeof renderLoreEntries === "function") renderLoreEntries();
    if (typeof renderPatDailySummary === "function") renderPatDailySummary();
});

function addCharacter() {
    const nameInput = document.getElementById("name");
    const name = (nameInput?.value || "").trim();
    if (!name) {
        if (typeof switchCharFormTab === "function") switchCharFormTab("profile");
        if (nameInput) nameInput.focus();
        showSaveToast("キャラクター名を入力してください！", "error");
        return;
    }

    const furigana = (document.getElementById("furigana")?.value || "").trim();
    const occupation = (document.getElementById("occupation")?.value || "").trim();
    const personality = (document.getElementById("personality")?.value || "").trim();
    const world = (document.getElementById("world")?.value || "").trim();
    const group = (document.getElementById("group")?.value || "").trim();
    const tagInput = document.getElementById("tag")?.value || "";
    const tag = tagInput ? tagInput.split(/[,、]/).map(t => t.trim()).filter(Boolean) : [];
    const birthday = (document.getElementById("birthday")?.value || "").trim();
    const height = (document.getElementById("charHeightInput")?.value || "").trim();
    const color = document.getElementById("color")?.value || "#5865f2";
    const isPublic = document.getElementById("isPublic")?.checked || false;
    const imagePosition = document.getElementById("char-image-position")?.value || "center";
    const iconUrl = document.getElementById("charIconDataUrl")?.value || null;

    const memos = [];
    document.querySelectorAll('.memo-input-group').forEach(div => {
        const t = div.querySelector('.memo-title')?.value || "";
        const c = div.querySelector('.memo-content')?.value || "";
        if (t || c) memos.push({ title: t, content: c });
    });
    const memoStr = memos.length > 0 ? JSON.stringify(memos) : "";

    const youtubeInputs = document.querySelectorAll(".char-youtube-url");
    const youtubeUrls = Array.from(youtubeInputs).map(input => input.value.trim()).filter(Boolean);

    const existingChar = editId !== null ? characters.find(c => c.id === editId) : null;

    const pendingRelations = [...tempRelations];

    const characterData = {
        id: editId === null ? Date.now() : editId,
        name: name,
        furigana: furigana,
        occupation: occupation,
        personality: personality,
        memo: memoStr,
        world: world,
        group: group,
        tag: tag,
        birthday: birthday,
        height: height,
        color: color,
        isPublic: isPublic,
        relations: pendingRelations.map(r => ({ title: r.title, targetId: r.targetId })),
        links: [...tempLinks],
        images: [...tempImages],
        gallery: [...tempCharGallery],
        youtubeUrls: youtubeUrls,
        mainExpressions: [...mainExpressions],
        novelSeries: existingChar && existingChar.novelSeries ? existingChar.novelSeries : [],
        favorite: existingChar ? existingChar.favorite : false,
        isOpen: existingChar ? existingChar.isOpen : false,
        imagePosition: imagePosition,
        iconUrl: iconUrl,
    };

    const wasEditing = (editId !== null);
    if (editId === null) {
        characters.unshift(characterData);
    } else {
        const index = characters.findIndex(c => c.id === editId);
        if (index !== -1) characters[index] = characterData;
        editId = null;
    }

    // 相手 → 自分 の逆向き関係が指定されている場合、相手キャラクターへ一括登録・更新する
    let reverseSyncCount = 0;
    pendingRelations.forEach(rel => {
        const revTitle = typeof rel.reverseTitle === "string" ? rel.reverseTitle.trim() : "";
        if (!revTitle) return;
        const targetChar = characters.find(c => String(c.id) === String(rel.targetId));
        if (!targetChar || String(targetChar.id) === String(characterData.id)) return;
        if (!Array.isArray(targetChar.relations)) targetChar.relations = [];
        const existingRevIdx = targetChar.relations.findIndex(r => String(r.targetId) === String(characterData.id));
        if (existingRevIdx !== -1) {
            targetChar.relations[existingRevIdx] = { title: revTitle, targetId: characterData.id };
        } else {
            targetChar.relations.push({ title: revTitle, targetId: characterData.id });
        }
        reverseSyncCount++;
    });

    document.getElementById("name").value = "";
    if (document.getElementById("furigana")) document.getElementById("furigana").value = "";
    if (document.getElementById("occupation")) document.getElementById("occupation").value = "";
    document.getElementById("personality").value = "";
    document.getElementById("world").value = "";
    document.getElementById("group").value = "";
    document.getElementById("tag").value = "";
    document.getElementById("birthday").value = "";
    if (document.getElementById("charHeightInput")) document.getElementById("charHeightInput").value = "";
    document.getElementById("color").value = "#5865f2";
    if (document.getElementById("isPublic")) document.getElementById("isPublic").checked = false;
    if (document.getElementById("char-image-position")) document.getElementById("char-image-position").value = "center";
    if (typeof clearCharIcon === "function") clearCharIcon();
    tempRelations = [];
    document.getElementById("tempRelationList").innerHTML = "";
    if (document.getElementById("relationTitle")) document.getElementById("relationTitle").value = "";
    if (document.getElementById("relationReverseTitle")) document.getElementById("relationReverseTitle").value = "";
    if (document.getElementById("relationTargetId")) document.getElementById("relationTargetId").value = "";
    if (typeof updateRelationReverseHint === "function") updateRelationReverseHint();
    tempLinks = [];
    document.getElementById("tempLinkList").innerHTML = "";
    tempImages = [];
    document.getElementById("tempImageList").innerHTML = "";
    mainExpressions = [];
    tempCharGallery = [];
    if (document.getElementById("tempCharGalleryList")) document.getElementById("tempCharGalleryList").innerHTML = "";
    const memoContainer = document.getElementById("memoContainer");
    if (memoContainer) memoContainer.innerHTML = "";
    document.getElementById("youtubeContainer").innerHTML = "";
    addYoutubeInputField();

    localStorage.setItem("characters", JSON.stringify(characters));
    display();
    if (typeof renderHomeBirthdaySpotlight === "function") renderHomeBirthdaySpotlight();
    if (typeof renderRelationshipMap === "function" && document.getElementById("rel-map-page")?.style.display !== "none") {
        renderRelationshipMap();
    }
    if (typeof updateFormEditStateUI === "function") updateFormEditStateUI();
    if (wasEditing) closeFormPanel();
    const syncSuffix = reverseSyncCount > 0 ? `（相手側 ${reverseSyncCount}件も一括登録）` : "";
    showSaveToast(`キャラクター「${characterData.name}」を${wasEditing ? '更新' : '登録'}しました！${syncSuffix}`, "success");
}
window.addCharacter = addCharacter;

function switchCharFormTab(tabName = "profile") {
    const navBtns = document.querySelectorAll("#charFormTabNav .form-tab-btn");
    const panes = document.querySelectorAll("#charFormTabsViewport .form-tab-pane");
    navBtns.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.tab === tabName);
    });
    panes.forEach(pane => {
        pane.classList.toggle("active", pane.dataset.tabPane === tabName);
    });
    const viewport = document.getElementById("charFormTabsViewport");
    if (viewport) viewport.scrollTop = 0;
}
window.switchCharFormTab = switchCharFormTab;

function updateFormEditStateUI() {
    const submitBtn = document.getElementById("charFormSubmitBtn");
    const cancelBtn = document.getElementById("charFormCancelEditBtn");
    const isEditing = editId !== null;
    if (submitBtn) {
        submitBtn.textContent = isEditing ? "この内容で更新する" : t("char.submitBtn");
    }
    if (cancelBtn) {
        cancelBtn.style.display = isEditing ? "" : "none";
    }
}

function cancelEditCharacter() {
    editId = null;
    document.getElementById("name").value = "";
    if (document.getElementById("furigana")) document.getElementById("furigana").value = "";
    if (document.getElementById("occupation")) document.getElementById("occupation").value = "";
    document.getElementById("personality").value = "";
    document.getElementById("world").value = "";
    document.getElementById("group").value = "";
    document.getElementById("tag").value = "";
    document.getElementById("birthday").value = "";
    if (document.getElementById("charHeightInput")) document.getElementById("charHeightInput").value = "";
    document.getElementById("color").value = "#5865f2";
    if (document.getElementById("isPublic")) document.getElementById("isPublic").checked = false;
    if (document.getElementById("char-image-position")) document.getElementById("char-image-position").value = "center";
    if (typeof clearCharIcon === "function") clearCharIcon();
    tempRelations = [];
    if (document.getElementById("tempRelationList")) document.getElementById("tempRelationList").innerHTML = "";
    if (document.getElementById("relationTitle")) document.getElementById("relationTitle").value = "";
    if (document.getElementById("relationReverseTitle")) document.getElementById("relationReverseTitle").value = "";
    if (document.getElementById("relationTargetId")) document.getElementById("relationTargetId").value = "";
    if (typeof updateRelationReverseHint === "function") updateRelationReverseHint();
    tempLinks = [];
    if (document.getElementById("tempLinkList")) document.getElementById("tempLinkList").innerHTML = "";
    tempImages = [];
    if (document.getElementById("tempImageList")) document.getElementById("tempImageList").innerHTML = "";
    mainExpressions = [];
    tempCharGallery = [];
    if (document.getElementById("tempCharGalleryList")) document.getElementById("tempCharGalleryList").innerHTML = "";
    const memoContainer = document.getElementById("memoContainer");
    if (memoContainer) memoContainer.innerHTML = "";
    const ytContainer = document.getElementById("youtubeContainer");
    if (ytContainer) {
        ytContainer.innerHTML = "";
        addYoutubeInputField();
    }
    populateRelationTargetSelect();
    updateFormEditStateUI();
    switchCharFormTab("profile");
}
window.cancelEditCharacter = cancelEditCharacter;

function populateRelationTargetSelect() {
    const relSelect = document.getElementById("relationTargetId");
    if (!relSelect) return;
    const prevValue = relSelect.value;
    const viewer = auth.currentUser;
    const viewerCanSeePrivate = !!(viewer && currentPageAuthorId && viewer.uid === currentPageAuthorId && !previewAsVisitor);
    const activeCharacters = characters.filter(c => {
        if (c.deletedAt) return false;
        if (!viewerCanSeePrivate && c.isPublic === false) return false;
        return true;
    });
    relSelect.innerHTML = '<option value="">-- キャラを選択 --</option>';
    activeCharacters.forEach(c => {
        if (editId === null || String(c.id) !== String(editId)) {
            relSelect.innerHTML += `<option value="${c.id}">${escapeHTML(c.name)} (${escapeHTML(c.world || t('js.worldless'))})</option>`;
        }
    });
    if (prevValue && (editId === null || String(prevValue) !== String(editId))) {
        relSelect.value = prevValue;
    }
    if (typeof updateRelationReverseHint === "function") updateRelationReverseHint();
}

function display() {
    const viewer = auth.currentUser;
    const viewerCanSeePrivate = !!(viewer && currentPageAuthorId && viewer.uid === currentPageAuthorId && !previewAsVisitor);

    const activeCharacters = characters.filter(c => {
        if (c.deletedAt) return false;
        if (!viewerCanSeePrivate && c.isPublic === false) return false;
        return true;
    });

    populateRelationTargetSelect();

    const list = document.getElementById("list");
    if (!list) return;

    const search = (document.getElementById("search")?.value || "").toLowerCase();
    const worldFilter = (document.getElementById("worldFilter")?.value || "").toLowerCase();

    list.innerHTML = "";

    const worldButtons = document.getElementById("worldButtons");
    if (worldButtons) {
        worldButtons.innerHTML = `<button onclick="filterWorld('')">${t("js.all")}</button> `;
        const worlds = [...new Set(activeCharacters.map(c => c.world).filter(Boolean))];
        worlds.forEach(w => {
            worldButtons.innerHTML += `<button onclick="filterWorld('${escapeHTML(w)}')">${escapeHTML(w)}</button> `;
        });
    }

    const tagList = document.getElementById("tagList");
    if (tagList) {
        tagList.innerHTML = `<span class="tag" onclick="searchTag('')" style="background:#94a3b8;">${t("js.all")}</span>`;
        let allTags = [];
        activeCharacters.forEach(c => {
            if (Array.isArray(c.tag)) allTags.push(...c.tag);
        });
        allTags = [...new Set(allTags.filter(Boolean))];
        allTags.forEach(tg => {
            tagList.innerHTML += `<span class="tag" onclick="searchTag('${escapeHTML(tg)}')">${escapeHTML(tg)}</span>`;
        });
    }

    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : viewerCanSeePrivate;
    const trashCount = characters.filter(c => c.deletedAt).length;
    const trashBtnContainer = document.getElementById("trashButtonContainer");
    const trashPanel = document.getElementById("trashPanel");
    if (trashBtnContainer) {
        if (editable) {
            trashBtnContainer.style.display = "";
            trashBtnContainer.innerHTML = `<button type="button" onclick="toggleTrashPanel()" class="header-btn secondary">${t("js.trashBtn")}${trashCount > 0 ? `（${trashCount}）` : ""}</button>`;
        } else {
            trashBtnContainer.style.display = "none";
            trashBtnContainer.innerHTML = "";
            if (trashPanel) trashPanel.style.display = "none";
        }
    }

    let displayCharacters = [...activeCharacters];
    const sortType = document.getElementById("sort")?.value || "new";
    displayCharacters.sort((a, b) => {
        if (sortType === "new") return (b.id || 0) - (a.id || 0);
        if (sortType === "old") return (a.id || 0) - (b.id || 0);
        if (sortType === "name") return (a.name || "").localeCompare(b.name || "");
        if (sortType === "favorite") {
            if (a.favorite !== b.favorite) return (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0);
            return (b.id || 0) - (a.id || 0);
        }
        return 0;
    });

    displayCharacters.forEach((c) => {
        const tagHTML = Array.isArray(c.tag)
            ? c.tag.map(tag => `<span class="tag" onclick="searchTag('${escapeHTML(tag)}')">${escapeHTML(tag)}</span>`).join(" ")
            : escapeHTML(c.tag || "");
        
        const matchSearch = (c.name || "").toLowerCase().includes(search) || 
                            (c.personality || "").toLowerCase().includes(search) || 
                            (c.memo || "").toLowerCase().includes(search) || 
                            (c.tag ? (Array.isArray(c.tag) ? c.tag.some(t => t.toLowerCase().includes(search)) : c.tag.toLowerCase().includes(search)) : false);
        const matchWorld = worldFilter === "" || (c.world || "").toLowerCase().includes(worldFilter);

        if (matchSearch && matchWorld) {
            const charColor = c.color || "#5865f2";
            let imageHTML = "";
            let imageNavHTML = "";

            if (c.images && c.images.length > 0) {
                const pos = c.imagePosition || 'center';
                const imgStyle = (pos === 'contain')
                    ? `width: 100%; height: 100%; object-fit: contain; background: rgba(0, 0, 0, 0.02);`
                    : `width: 100%; height: 100%; object-fit: cover; object-position: ${escapeHTML(pos)};`;
                imageHTML = `
                <div class="char-image-container">
                    <img src="${escapeHTML(c.images[0].url)}" class="character-image" id="char-image-${c.id}" onclick="openCharacterDetail(${c.id})" style="${imgStyle}">
                </div>`;

                if (c.images.length > 1) {
                    imageNavHTML = `<div class="image-nav" style="display:flex; gap:4px; margin-top:6px; justify-content:center; flex-wrap:wrap;">
                        ${c.images.map((img, index) => `<button onclick="changeCharacterImage(${c.id}, ${index})" style="padding:2px 8px; font-size:11px; margin:0; background:${charColor}; border-radius:3px; border:none; color:white; cursor:pointer;">${escapeHTML(img.title)}</button>`).join('')}
                    </div>`;
                }
            }

            const nameHTML = c.furigana
                ? `<ruby>${escapeHTML(c.name)}<rt style="font-size:10px; color:var(--text-muted);">${escapeHTML(c.furigana)}</rt></ruby>`
                : escapeHTML(c.name);

            const isPrivateChar = (viewerCanSeePrivate && c.isPublic === false);
            const privateStatusRowHTML = isPrivateChar
                ? `<div class="card-status-row"><span class="card-private-pill">${t("char.privateBadge")}</span></div>`
                : '';

            let relationsHTML = "";
            if (c.relations && c.relations.length > 0) {
                relationsHTML = `<div style="margin-top:6px; font-size:12px;"><strong>${t("char.labelRelations")}</strong> ` +
                    c.relations.map(r => {
                        const targetChar = characters.find(tc => String(tc.id) === String(r.targetId));
                        const targetName = targetChar ? escapeHTML(targetChar.name) : "登録キャラ";
                        return `<span class="relation-badge" onclick="event.stopPropagation(); openCharacterDetail(${r.targetId})" title="${escapeHTML(r.title)}">${escapeHTML(r.title)} → ${targetName}</span>`;
                    }).join(" ") + `</div>`;
            }

            list.innerHTML += `
            <div class="card ${isPrivateChar ? 'is-private-card' : ''}" style="border-top: 5px solid ${charColor};">
                ${privateStatusRowHTML}
                <div style="text-align: center;">${imageHTML}${imageNavHTML}</div>
                <b class="card-char-name" style="color:${charColor};">${nameHTML}</b>
                
                <button class="toggle-button card-detail-open-btn" onclick="openCharacterDetail(${c.id})">${t("char.openDetailPage")}</button>
                <button class="toggle-button" id="toggle-${c.id}" onclick="toggleDetail(${c.id})">${c.isOpen ? t("js.detailClose") : t("js.detailOpen")}</button>
                
                <div id="detail-${c.id}" class="detail ${c.isOpen ? 'open' : ''}">
                    <div style="margin-top: 8px; line-height: 1.6;">
                        <strong>${t("char.labelWorld")}</strong> ${escapeHTML(c.world || "未設定")}<br>
                        <strong>${t("char.labelTag")}</strong> ${tagHTML}<br>
                        ${c.occupation ? `<strong>${t("char.labelOccupation")}</strong> ${escapeHTML(c.occupation)}<br>` : ""}
                        <strong>${t("char.labelPersonality")}</strong> ${escapeHTML(c.personality || "未設定")}<br>
                        <strong>${t("char.labelBirthday")}</strong> ${escapeHTML(c.birthday || "未設定")}<br>
                        ${c.height ? `<strong>身長:</strong> ${escapeHTML(String(c.height))}${/^\d+(\.\d+)?$/.test(String(c.height).trim()) ? "cm" : ""}<br>` : ""}
                        ${relationsHTML}
                    </div>
                    <div style="display:flex; gap:6px; margin-top:10px;">
                        <button onclick="editCharacter(${c.id})" class="header-btn secondary" style="flex:1;">${t("js.edit")}</button>
                        <button onclick="toggleFavorite(${c.id})" class="header-btn" style="flex:1; background:rgba(0,0,0,0.05); color:var(--text-main);">${c.favorite ? t("js.favoriteOn") : t("js.favoriteOff")}</button>
                        <button onclick="deleteCharacter(${c.id})" class="header-btn danger" style="padding:4px 8px;">削除</button>
                    </div>
                </div>
            </div>`;
        }
    });

    setupHoverYouTubePlayers();
    updateCardHeightUI();
}
window.display = display;

let isUniformCardHeight = localStorage.getItem("card_height_mode") === "uniform";
function updateCardHeightUI() {
    const list = document.getElementById("list");
    const btn = document.getElementById("cardHeightToggleBtn");
    if (!list) return;
    if (isUniformCardHeight) {
        list.classList.add("uniform-height-mode");
        if (btn) btn.textContent = "カード揃え: 均等揃え";
    } else {
        list.classList.remove("uniform-height-mode");
        if (btn) btn.textContent = "カード揃え: 自然な高さ";
    }
}
function toggleCardHeightMode() {
    isUniformCardHeight = !isUniformCardHeight;
    localStorage.setItem("card_height_mode", isUniformCardHeight ? "uniform" : "natural");
    updateCardHeightUI();
}
window.toggleCardHeightMode = toggleCardHeightMode;

const TRASH_RETENTION_DAYS = 30;

async function deleteCharacter(id) {
    const targetId = String(id);
    const index = characters.findIndex(c => String(c.id) === targetId);
    if (index === -1) return;
    const charName = characters[index].name || "このキャラクター";
    
    if (!confirm(`「${charName}」をゴミ箱に移動します。\nゴミ箱の中からいつでも元に戻せます（30日間保管後に完全削除）。`)) {
        return;
    }

    try {
        characters[index].deletedAt = Date.now();
        localStorage.setItem("characters", JSON.stringify(characters));
        display();

        const urlParams = new URLSearchParams(window.location.search);
        const pageId = urlParams.get('id');
        if (pageId) {
            await db.collection("pages").doc(pageId).collection("characters").doc(targetId).set(characters[index]);
        }
    } catch (error) {
        console.error("削除エラー:", error);
    }
}
window.deleteCharacter = deleteCharacter;

function toggleAdvancedSearch() {
    const panel = document.getElementById("advancedSearchPanel");
    if (!panel) return;
    panel.style.display = panel.style.display === "none" ? "block" : "none";
}
window.toggleAdvancedSearch = toggleAdvancedSearch;

function toggleTrashPanel() {
    const panel = document.getElementById("trashPanel");
    if (!panel) return;
    const willOpen = panel.style.display === "none";
    panel.style.display = willOpen ? "block" : "none";
    if (willOpen) renderTrashList();
}
window.toggleTrashPanel = toggleTrashPanel;

function renderTrashList() {
    const listEl = document.getElementById("trashList");
    if (!listEl) return;
    const trashed = characters.filter(c => c.deletedAt).sort((a, b) => b.deletedAt - a.deletedAt);
    if (trashed.length === 0) {
        listEl.innerHTML = `<p style="color:var(--text-muted); font-size:13px; margin:0;">${t("trash.empty")}</p>`;
        return;
    }

    listEl.innerHTML = trashed.map(c => `
        <div style="display:flex; align-items:center; justify-content:space-between; background:var(--card-bg-solid); border:1px solid var(--card-border); border-radius:6px; padding:8px 12px; gap:10px;">
            <div><strong>${escapeHTML(c.name)}</strong></div>
            <div style="display:flex; gap:6px;">
                <button type="button" onclick="restoreCharacter(${c.id})" class="header-btn success" style="font-size:12px; padding:4px 8px;">${t("js.restoreBtn")}</button>
                <button type="button" onclick="permanentlyDeleteCharacter(${c.id})" class="header-btn danger" style="font-size:12px; padding:4px 8px;">${t("js.permaDeleteBtn")}</button>
            </div>
        </div>
    `).join("");
}
window.renderTrashList = renderTrashList;

async function restoreCharacter(id) {
    const targetId = String(id);
    const index = characters.findIndex(c => String(c.id) === targetId);
    if (index === -1) return;

    delete characters[index].deletedAt;
    localStorage.setItem("characters", JSON.stringify(characters));
    display();
    renderTrashList();

    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('id');
    if (pageId) {
        try {
            await db.collection("pages").doc(pageId).collection("characters").doc(targetId).set(characters[index]);
        } catch (e) {}
    }
}
window.restoreCharacter = restoreCharacter;

async function permanentlyDeleteCharacter(id) {
    const targetId = String(id);
    const char = characters.find(c => String(c.id) === targetId);
    if (!confirm(`「${char ? char.name : "このキャラ"}」を完全に削除します。よろしいですか？`)) return;

    characters = characters.filter(c => String(c.id) !== targetId);
    localStorage.setItem("characters", JSON.stringify(characters));
    display();
    renderTrashList();

    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('id');
    if (pageId) {
        try {
            await db.collection("pages").doc(pageId).collection("characters").doc(targetId).delete();
        } catch (e) {}
    }
}
window.permanentlyDeleteCharacter = permanentlyDeleteCharacter;

async function purgeOldTrash() {
    const now = Date.now();
    const cutoffMs = TRASH_RETENTION_DAYS * 24 * 60 * 60 * 1000;
    const toPurge = characters.filter(c => c.deletedAt && (now - c.deletedAt > cutoffMs));
    if (toPurge.length === 0) return;

    const pageId = new URLSearchParams(window.location.search).get('id');
    characters = characters.filter(c => !(c.deletedAt && (now - c.deletedAt > cutoffMs)));
    localStorage.setItem("characters", JSON.stringify(characters));

    if (pageId) {
        for (const c of toPurge) {
            try { await db.collection("pages").doc(pageId).collection("characters").doc(String(c.id)).delete(); } catch (e) {}
        }
    }
}

function editCharacter(id) {
    const c = characters.find(char => char.id === id);
    if (!c) return;

    document.getElementById("name").value = c.name || "";
    if (document.getElementById("furigana")) document.getElementById("furigana").value = c.furigana || "";
    if (document.getElementById("occupation")) document.getElementById("occupation").value = c.occupation || "";
    document.getElementById("personality").value = c.personality || "";
    document.getElementById("world").value = c.world || "";
    document.getElementById("group").value = c.group || "";
    document.getElementById("tag").value = Array.isArray(c.tag) ? c.tag.join(", ") : (c.tag || "");
    document.getElementById("birthday").value = c.birthday || "";
    if (document.getElementById("charHeightInput")) document.getElementById("charHeightInput").value = c.height || "";
    document.getElementById("color").value = c.color || "#5865f2";
    if (document.getElementById("isPublic")) document.getElementById("isPublic").checked = !!c.isPublic;
    if (document.getElementById("char-image-position")) {
        document.getElementById("char-image-position").value = c.imagePosition || "center";
    }

    const iconPreviewImg = document.getElementById("charIconPreviewImg");
    const iconPlaceholder = document.getElementById("charIconPlaceholder");
    const iconClearBtn = document.getElementById("charIconClearBtn");
    const iconDataUrl = document.getElementById("charIconDataUrl");
    if (c.iconUrl) {
        if (iconPreviewImg) { iconPreviewImg.src = c.iconUrl; iconPreviewImg.style.display = "block"; }
        if (iconPlaceholder) iconPlaceholder.style.display = "none";
        if (iconClearBtn) iconClearBtn.style.display = "inline-block";
        if (iconDataUrl) iconDataUrl.value = c.iconUrl;
    } else {
        if (iconPreviewImg) { iconPreviewImg.src = ""; iconPreviewImg.style.display = "none"; }
        if (iconPlaceholder) iconPlaceholder.style.display = "block";
        if (iconClearBtn) iconClearBtn.style.display = "none";
        if (iconDataUrl) iconDataUrl.value = "";
    }

    const container = document.getElementById("youtubeContainer");
    if (container) {
        container.innerHTML = "";
        if (c.youtubeUrls && c.youtubeUrls.length > 0) {
            c.youtubeUrls.forEach(url => addYoutubeInputField(url));
        } else {
            addYoutubeInputField();
        }
    }

    const memoContainer = document.getElementById("memoContainer");
    if (memoContainer) {
        memoContainer.innerHTML = "";
        if (c.memo) {
            try {
                const memos = JSON.parse(c.memo);
                memos.forEach(m => addMemoInputField(m.title, m.content));
            } catch (e) {
                addMemoInputField("基本メモ", c.memo);
            }
        }
    }

    tempRelations = c.relations ? c.relations.map(r => ({ ...r })) : [];
    updateTempRelationDisplay();
    if (document.getElementById("relationTitle")) document.getElementById("relationTitle").value = "";
    if (document.getElementById("relationReverseTitle")) document.getElementById("relationReverseTitle").value = "";
    if (document.getElementById("relationTargetId")) document.getElementById("relationTargetId").value = "";
    tempLinks = c.links ? [...c.links] : []; 
    updateTempLinkDisplay(); 
    tempImages = c.images ? [...c.images] : [];
    updateTempImageDisplay();
    mainExpressions = c.mainExpressions ? [...c.mainExpressions] : [];
    tempCharGallery = c.gallery ? [...c.gallery] : [];
    renderTempCharGalleryList();

    editId = id; 
    populateRelationTargetSelect();
    updateFormEditStateUI();
    switchCharFormTab("profile");
    openFormPanel();
}
window.editCharacter = editCharacter;

function toggleDetail(id) {
    const c = characters.find(c => c.id === id);
    if (!c) return;
    c.isOpen = !c.isOpen; 
    const detail = document.getElementById(`detail-${id}`);
    const button = document.getElementById(`toggle-${id}`);
    if (detail && button) {
        detail.classList.toggle("open");
        button.innerHTML = detail.classList.contains("open") ? t("js.detailClose") : t("js.detailOpen");
    }
}
window.toggleDetail = toggleDetail;

function downloadJSON() {
    const dataStr = JSON.stringify(characters, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "characters.json";
    link.click();
}
window.downloadJSON = downloadJSON;

function loadJSON() {
    const file = document.getElementById("loadJSONInput").files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
        characters = JSON.parse(event.target.result);
        localStorage.setItem("characters", JSON.stringify(characters));
        display();
        alert("バックアップデータを復元しました！");
    };
    reader.readAsText(file);
}
window.loadJSON = loadJSON;

function exportNovelText() {
    const char = characters.find(c => c.id === currentNovelCharId);
    const series = (char && char.novelSeries && char.novelSeries[currentSeriesIdx]) ? char.novelSeries[currentSeriesIdx] : null;
    const epTitle = document.getElementById("episode-title")?.value || "無題";
    const body = document.getElementById("novel-output")?.value || "";

    if (!body.trim()) {
        alert("出力する本文がありません。");
        return;
    }

    const header = [
        `========================================`,
        `【作品名】${series ? series.title : 'オリジナル作品'}`,
        `【登場キャラクター】${char ? char.name : '未設定'}`,
        `【エピソード】${epTitle}`,
        `========================================\n\n`
    ].join("\n");

    const fullContent = header + body + "\n\n(Generated from My Character Wiki)";
    const blob = new Blob([fullContent], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    const filename = `${(series ? series.title : 'story')}_${epTitle}.txt`.replace(/[/\\?%*:|"<>]/g, '_');
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
window.exportNovelText = exportNovelText;

async function handleCharIconFile(input) {
    if (!input.files || !input.files[0]) return;
    try {
        const compressed = await compressImage(input.files[0], 400);
        document.getElementById("charIconDataUrl").value = compressed;
        const img = document.getElementById("charIconPreviewImg");
        const placeholder = document.getElementById("charIconPlaceholder");
        const clearBtn = document.getElementById("charIconClearBtn");
        if (img) { img.src = compressed; img.style.display = "block"; }
        if (placeholder) placeholder.style.display = "none";
        if (clearBtn) clearBtn.style.display = "inline-block";
    } catch (e) {
        alert("アイコン画像の読み込みに失敗しました");
    }
}
window.handleCharIconFile = handleCharIconFile;

function clearCharIcon() {
    const input = document.getElementById("charIconFile");
    const dataUrl = document.getElementById("charIconDataUrl");
    const img = document.getElementById("charIconPreviewImg");
    const placeholder = document.getElementById("charIconPlaceholder");
    const clearBtn = document.getElementById("charIconClearBtn");
    if (input) input.value = "";
    if (dataUrl) dataUrl.value = "";
    if (img) { img.src = ""; img.style.display = "none"; }
    if (placeholder) placeholder.style.display = "block";
    if (clearBtn) clearBtn.style.display = "none";
}
window.clearCharIcon = clearCharIcon;

function toggleFavorite(id) {
    const c = characters.find(c => c.id === id);
    if (c) {
        c.favorite = !c.favorite;
        localStorage.setItem("characters", JSON.stringify(characters));
        display();
    }
}
window.toggleFavorite = toggleFavorite;

function searchTag(tag) { 
    const searchInput = document.getElementById("search");
    if (searchInput) searchInput.value = tag;
    display(); 
}
window.searchTag = searchTag;

function filterWorld(world) { 
    const worldFilter = document.getElementById("worldFilter");
    if (worldFilter) worldFilter.value = world;
    if (typeof applyWorldTheme === "function") applyWorldTheme(world);
    display(); 
}
window.filterWorld = filterWorld;

function showRandomCharacter() {
    const activeChars = characters.filter(c => !c.deletedAt);
    if (activeChars.length === 0) return alert("キャラクターがまだ登録されていません！");
    const randomIndex = Math.floor(Math.random() * activeChars.length);
    const randomChar = activeChars[randomIndex];
    alert(`今日描くキャラは…\n\n【 ${randomChar.name} 】です！\n（世界線: ${randomChar.world || '未設定'}）\n\n個別ページを開きます！`);
    openCharacterDetail(randomChar.id);
}
window.showRandomCharacter = showRandomCharacter;

function addLinkToList() {
    let title = document.getElementById("linkTitle").value.trim() || "リンク";
    const url = document.getElementById("linkUrl").value.trim();
    if (!url) return alert("URLを入力してください！");
    tempLinks.push({ title: title, url: url });
    document.getElementById("linkTitle").value = "";
    document.getElementById("linkUrl").value = "";
    updateTempLinkDisplay();
}
window.addLinkToList = addLinkToList;

function removeLinkFromList(index) { tempLinks.splice(index, 1); updateTempLinkDisplay(); }
window.removeLinkFromList = removeLinkFromList;

function updateTempLinkDisplay() {
    const container = document.getElementById("tempLinkList");
    if (!container) return;
    container.innerHTML = tempLinks.map((l, index) => `<span style="background:var(--card-bg); border:1px solid var(--card-border); padding:3px 8px; border-radius:4px; display:inline-flex; align-items:center; gap:4px; font-size:12px;">${escapeHTML(l.title)}<button type="button" onclick="removeLinkFromList(${index})" style="background:none; border:none; color:var(--danger); cursor:pointer; padding:0;">×</button></span>`).join(" ");
}

async function addImageToList() {
    let title = document.getElementById("imageTitle").value.trim();
    const fileInput = document.getElementById("imageFile");
    if (!fileInput.files || !fileInput.files[0]) return alert("画像ファイルを選択してください！");
    if (!title) title = tempImages.length === 0 ? "メイン立ち絵" : `衣装 ${tempImages.length + 1}`; 
    
    try {
        const compressedBase64 = await compressImage(fileInput.files[0], 1200); 
        tempImages.push({ title: title, url: compressedBase64, expressions: [] });
        document.getElementById("imageTitle").value = "";
        fileInput.value = ""; 
        updateTempImageDisplay();
    } catch (error) {
        alert("画像の読み込みに失敗しました");
    }
}
window.addImageToList = addImageToList;

function removeImageFromList(index) { tempImages.splice(index, 1); updateTempImageDisplay(); }
window.removeImageFromList = removeImageFromList;

function updateTempImageDisplay() {
    const container = document.getElementById("tempImageList");
    if (!container) return;

    container.innerHTML = tempImages.map((img, index) => {
        const expBadges = img.expressions && img.expressions.length > 0
            ? img.expressions.map((exp, expIdx) => `
                <span style="background:var(--accent-purple); color:white; padding:2px 6px; font-size:11px; border-radius:3px; display:inline-flex; align-items:center; gap:3px;">
                    ${escapeHTML(exp.title)}
                    <button type="button" onclick="removeExpressionFromTempImage(${index}, ${expIdx})" style="background:none; border:none; color:white; cursor:pointer; padding:0;">×</button>
                </span>
              `).join(" ")
            : "<span style='color:var(--text-muted); font-size:11px;'>まだ表情差分はありません</span>";

        return `
            <div style="background:rgba(0,0,0,0.02); border:1px solid var(--card-border); padding:10px; border-radius:6px; margin-top:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                    <strong style="font-size:12px;">衣装: ${escapeHTML(img.title)}</strong>
                    <button type="button" onclick="removeImageFromList(${index})" class="header-btn danger" style="padding:2px 6px; font-size:11px;">削除</button>
                </div>
                <div style="margin-bottom:6px; display:flex; flex-wrap:wrap; gap:4px;">${expBadges}</div>
                <div style="display:flex; gap:6px; align-items:center;">
                    <input type="text" id="expTitle-${index}" placeholder="表情名（笑顔等）" style="flex:1; font-size:12px; margin:0; padding:6px;">
                    <input type="file" id="expFile-${index}" accept="image/*" style="flex:1.5; font-size:11px; margin:0;">
                    <button type="button" onclick="addExpressionToTempImage(${index})" class="header-btn primary" style="padding:6px 10px; font-size:12px; white-space:nowrap;">追加</button>
                </div>
            </div>
        `;
    }).join("");
}

async function addExpressionToTempImage(imageIndex) {
    const titleInput = document.getElementById(`expTitle-${imageIndex}`);
    const fileInput = document.getElementById(`expFile-${imageIndex}`);
    let title = titleInput.value.trim() || `表情 ${tempImages[imageIndex].expressions.length + 1}`;
    if (!fileInput.files || !fileInput.files[0]) return alert("画像ファイルを選択してください！");

    try {
        const compressedBase64 = await compressImage(fileInput.files[0], 400);
        if (!tempImages[imageIndex].expressions) tempImages[imageIndex].expressions = [];
        tempImages[imageIndex].expressions.push({ title: title, url: compressedBase64 });
        titleInput.value = "";
        fileInput.value = "";
        updateTempImageDisplay();
    } catch (e) { alert("表情の読み込みに失敗しました"); }
}
window.addExpressionToTempImage = addExpressionToTempImage;

function removeExpressionFromTempImage(imageIndex, expIndex) {
    tempImages[imageIndex].expressions.splice(expIndex, 1);
    updateTempImageDisplay();
}
window.removeExpressionFromTempImage = removeExpressionFromTempImage;

async function addCharacterGalleryImage() {
    const titleEl = document.getElementById("charGalleryTitle");
    const fileInput = document.getElementById("charGalleryFile");
    if (!fileInput || !fileInput.files || !fileInput.files[0]) return alert("画像ファイルを選択してください！");

    const title = titleEl ? titleEl.value.trim() : "";
    try {
        const compressedBase64 = await compressImage(fileInput.files[0], 1600);
        tempCharGallery.push({ id: Date.now(), title: title, url: compressedBase64 });
        if (titleEl) titleEl.value = "";
        fileInput.value = "";
        renderTempCharGalleryList();
    } catch (e) { alert("画像の読み込みに失敗しました"); }
}
window.addCharacterGalleryImage = addCharacterGalleryImage;

function removeCharacterGalleryImage(index) {
    tempCharGallery.splice(index, 1);
    renderTempCharGalleryList();
}
window.removeCharacterGalleryImage = removeCharacterGalleryImage;

function renderTempCharGalleryList() {
    const container = document.getElementById("tempCharGalleryList");
    if (!container) return;
    container.innerHTML = tempCharGallery.map((g, index) => `
        <div style="position:relative; width:65px; height:65px; display:inline-block; margin-right:6px;">
            <img src="${g.url}" style="width:100%; height:100%; object-fit:cover; border-radius:6px; border:1px solid var(--card-border);">
            <button type="button" onclick="removeCharacterGalleryImage(${index})" style="position:absolute; top:-5px; right:-5px; width:18px; height:18px; border-radius:50%; background:var(--danger); color:white; font-size:10px; border:none; cursor:pointer;">✕</button>
        </div>
    `).join("");
}
window.renderTempCharGalleryList = renderTempCharGalleryList;

function updateRelationReverseHint() {
    const hintEl = document.getElementById("relationReverseHint");
    const targetId = document.getElementById("relationTargetId")?.value || "";
    if (!hintEl) return;
    if (!targetId || editId === null) {
        hintEl.style.display = "none";
        hintEl.textContent = "";
        return;
    }
    const targetChar = characters.find(c => String(c.id) === String(targetId));
    if (!targetChar || !Array.isArray(targetChar.relations)) {
        hintEl.style.display = "none";
        hintEl.textContent = "";
        return;
    }
    const existingReverse = targetChar.relations.find(r => String(r.targetId) === String(editId));
    if (existingReverse) {
        hintEl.textContent = `相手（${targetChar.name}）側には現在「${existingReverse.title || "関係者"}」が登録されています（空欄のままなら変更しません）`;
        hintEl.style.display = "block";
    } else {
        hintEl.style.display = "none";
        hintEl.textContent = "";
    }
}
window.updateRelationReverseHint = updateRelationReverseHint;

function addRelationToList() {
    const titleInput = document.getElementById("relationTitle");
    const reverseInput = document.getElementById("relationReverseTitle");
    const targetSelect = document.getElementById("relationTargetId");
    const title = (titleInput?.value || "").trim() || "関係者";
    const reverseTitle = (reverseInput?.value || "").trim();
    const targetId = targetSelect?.value || "";
    if (!targetId) {
        showSaveToast("相手キャラクターを選択してください！", "error");
        return;
    }
    const targetChar = characters.find(c => String(c.id) === String(targetId));
    const normalizedTargetId = targetChar
        ? targetChar.id
        : (isNaN(Number(targetId)) ? targetId : Number(targetId));

    tempRelations.push({
        title: title,
        targetId: normalizedTargetId,
        ...(reverseTitle ? { reverseTitle } : {})
    });
    if (titleInput) titleInput.value = "";
    if (reverseInput) reverseInput.value = "";
    if (targetSelect) targetSelect.value = "";
    updateRelationReverseHint();
    updateTempRelationDisplay();
}
window.addRelationToList = addRelationToList;

function removeRelationFromList(index) { tempRelations.splice(index, 1); updateTempRelationDisplay(); }
window.removeRelationFromList = removeRelationFromList;

function updateTempRelationDisplay() {
    const container = document.getElementById("tempRelationList");
    if (!container) return;
    container.innerHTML = tempRelations.map((rel, index) => {
        const target = characters.find(c => String(c.id) === String(rel.targetId));
        const name = target ? target.name : "不明";
        const reverseBadge = rel.reverseTitle
            ? `<span class="temp-relation-reverse-tag">相手→自分: ${escapeHTML(rel.reverseTitle)}</span>`
            : "";
        return `<span class="temp-relation-pill"><span>${escapeHTML(rel.title)}: ${escapeHTML(name)}</span>${reverseBadge}<button type="button" onclick="removeRelationFromList(${index})" style="background:none; border:none; color:var(--danger); cursor:pointer; padding:0 3px;">×</button></span>`;
    }).join(" ");
}

function scrollToCharacterById(targetId) {
    openCharacterDetail(targetId);
}
window.scrollToCharacterById = scrollToCharacterById;

function changeCharacterImage(charId, imageIndex) {
    const c = characters.find(c => c.id === charId);
    if (!c || !c.images || !c.images[imageIndex]) return;
    const imgEl = document.getElementById(`char-image-${charId}`);
    if (imgEl) imgEl.src = c.images[imageIndex].url;
}
window.changeCharacterImage = changeCharacterImage;

// =========================================
// AI 機能
// =========================================
async function callAI(prompt) {
    const headers = { "Content-Type": "application/json" };
    const user = auth.currentUser;
    if (user) headers["Authorization"] = "Bearer " + await user.getIdToken();
    
    let res = await fetch("/api/ai", {
        method: "POST", headers, body: JSON.stringify({ prompt })
    });
    if (!res.ok && res.status === 404) {
        res = await fetch("/.netlify/functions/ai", {
            method: "POST", headers, body: JSON.stringify({ prompt })
        });
    }

    if (res.status === 404) throw new Error(t("ai.notDeployed"));
    let data = null;
    try { data = await res.json(); } catch (e) {}
    if (!res.ok || !data || !data.text) {
        throw new Error((data && data.error) || `${t("ai.unknownError")} (${res.status})`);
    }
    return data.text;
}

async function generateAIStory() {
    const name = document.getElementById("name")?.value || "名無し";
    const world = document.getElementById("world")?.value || "未設定";
    const personality = document.getElementById("personality")?.value || "未設定";
    const tags = document.getElementById("tag")?.value || "なし";
    
    let prompt = `以下のキャラクター設定をもとに、魅力的なバックストーリーを300〜400文字程度の小説風に書いてください。\n\n【設定】\n名前: ${name}\n世界線: ${world}\n性格: ${personality}\nタグ: ${tags}\n`;
    
    alert("AIがバックストーリーを執筆中です。数秒お待ちください...");
    try {
        const aiText = await callAI(prompt);
        addMemoInputField("AI生成バックストーリー", aiText);
        alert("バックストーリーが新しいメモ枠に追加されました！");
    } catch (error) { 
        alert(`AI生成でエラーが発生しました: ${error.message}`); 
    }
}
window.generateAIStory = generateAIStory;

// =========================================
// キャラクター個別画面
// =========================================
let detailCharId = null;
let detailArtIndex = 0;

function openCharacterDetail(id) {
    const c = characters.find(ch => ch.id === id);
    if (!c) return;
    detailCharId = id;
    detailArtIndex = 0;
    patpatCount = 0;
    renderCharacterDetail();

    if (c.world && typeof applyWorldTheme === "function") {
        applyWorldTheme(c.world);
    }

    const overlay = document.getElementById("characterDetailOverlay");
    if (!overlay) return;
    overlay.style.display = "flex";
    requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add("open")));
    document.body.style.overflow = "hidden";
}
window.openCharacterDetail = openCharacterDetail;

function closeCharacterDetail() {
    const overlay = document.getElementById("characterDetailOverlay");
    if (!overlay) return;
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    if (isPatPatMode) togglePatPatMode();
    if (typeof flushPendingPatStats === "function") flushPendingPatStats();
    if (typeof applyCustomTheme === "function") applyCustomTheme();
    setTimeout(() => { overlay.style.display = "none"; }, 300);
}
window.closeCharacterDetail = closeCharacterDetail;

function renderCharacterDetail() {
    const c = characters.find(ch => ch.id === detailCharId);
    if (!c) return;
    const images = c.images || [];
    const current = images[detailArtIndex] || images[0] || null;

    document.getElementById("charDetailName").textContent = c.name || "";
    document.getElementById("charDetailWorldPill").textContent = c.world || "世界線未設定";
    if (typeof renderPatDailySummary === "function") renderPatDailySummary();

    const mainImg = document.getElementById("charDetailMainImg");
    detailBaseArtUrl = current ? current.url : "";
    if (mainImg) mainImg.src = detailBaseArtUrl;

    const altArtEl = document.getElementById("charDetailAltArt");
    if (altArtEl) {
        if (images.length === 0) {
            altArtEl.innerHTML = `<span style="font-size:12px; color:var(--text-muted);">登録された衣装はありません</span>`;
        } else {
            altArtEl.innerHTML = images.map((img, idx) => `
                <div class="char-detail-altart-item ${idx === detailArtIndex ? 'active' : ''}" onclick="switchDetailArt(${idx})">
                    <img src="${escapeHTML(img.url)}">
                    <div>${escapeHTML(img.title || "")}</div>
                </div>
            `).join("");
        }
    }

    const exprEl = document.getElementById("charDetailExpressions");
    const exprBlock = document.getElementById("charDetailExpressionsBlock");
    if (exprEl && exprBlock) {
        const exprs = (current && current.expressions) || [];
        if (exprs.length > 0) {
            exprBlock.style.display = "block";
            exprEl.innerHTML = exprs.map(exp => `
                <img src="${escapeHTML(exp.url)}" title="${escapeHTML(exp.title || "")}" onclick="selectDetailExpression('${escapeHTML(exp.url)}')">
            `).join("");
        } else {
            exprBlock.style.display = "none";
        }
    }

    const profileEl = document.getElementById("charDetailProfile");
    if (profileEl) {
        let html = "";
        if (c.occupation) html += `<div class="char-detail-memo-block"><b>職業:</b> ${escapeHTML(c.occupation)}</div>`;
        if (c.personality) html += `<div class="char-detail-memo-block"><b>性格:</b> ${escapeHTML(c.personality)}</div>`;
        if (c.birthday) html += `<div class="char-detail-memo-block"><b>誕生日:</b> ${escapeHTML(c.birthday)}</div>`;
        if (c.height) html += `<div class="char-detail-memo-block"><b>身長:</b> ${escapeHTML(String(c.height))}${/^\d+(\.\d+)?$/.test(String(c.height).trim()) ? "cm" : ""}</div>`;
        if (c.memo) {
            try {
                const memos = JSON.parse(c.memo);
                if (Array.isArray(memos)) {
                    html += memos.map(m => `<div class="char-detail-memo-block"><b>${escapeHTML(m.title || "メモ")}:</b><p style="margin:4px 0 0; white-space:pre-wrap;">${escapeHTML(m.content || "")}</p></div>`).join("");
                }
            } catch (e) {
                html += `<div class="char-detail-memo-block"><p style="white-space:pre-wrap;">${escapeHTML(c.memo)}</p></div>`;
            }
        }
        if (c.relations && c.relations.length > 0) {
            html += `<div class="char-detail-memo-block"><b>関係性:</b><div style="margin-top:6px;">` +
                c.relations.map(r => {
                    const targetChar = characters.find(tc => String(tc.id) === String(r.targetId));
                    const targetName = targetChar ? escapeHTML(targetChar.name) : "未登録キャラ";
                    return `<span class="relation-badge" onclick="openCharacterDetail(${r.targetId})" title="${escapeHTML(r.title)}">${escapeHTML(r.title)} → ${targetName}</span>`;
                }).join(" ") + `</div></div>`;
        }
        profileEl.innerHTML = html;
    }

    const galleryEl = document.getElementById("charDetailGalleryGrid");
    if (galleryEl) {
        const gallery = c.gallery || [];
        if (gallery.length === 0) {
            galleryEl.innerHTML = `<p style="color:var(--text-muted); font-size:13px; grid-column:1/-1;">まだギャラリー画像はありません。</p>`;
        } else {
            galleryEl.innerHTML = gallery.map(g => `
                <div class="char-detail-gallery-item" onclick="openModal('${escapeHTML(g.url)}')">
                    <img src="${escapeHTML(g.url)}">
                </div>
            `).join("");
        }
    }
}

function switchDetailArt(index) {
    detailArtIndex = index;
    renderCharacterDetail();
}
window.switchDetailArt = switchDetailArt;

function selectDetailExpression(url) {
    detailBaseArtUrl = url;
    const mainImg = document.getElementById("charDetailMainImg");
    if (mainImg) mainImg.src = url;
}
window.selectDetailExpression = selectDetailExpression;

function openModal(imageSrc) { 
    const modal = document.getElementById("imageModal"); 
    const modalImg = document.getElementById("modalImage"); 
    if (modal && modalImg) { 
        modalImg.src = imageSrc; 
        modal.style.display = "flex"; 
    } 
}
window.openModal = openModal;

function closeModal() { 
    const modal = document.getElementById("imageModal"); 
    if (modal) modal.style.display = "none"; 
}
window.closeModal = closeModal;

function toggleSidebar() { 
    document.getElementById("sidebar")?.classList.toggle("open"); 
}
window.toggleSidebar = toggleSidebar;

// =========================================
// 画面切り替え
// =========================================
function switchPage(pageId) {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("character-page").style.display = "none";
    document.getElementById("lore-page").style.display = "none";
    document.getElementById("novel-page").style.display = "none";
    const boardEl = document.getElementById("board-page");
    if (boardEl) boardEl.style.display = "none";
    const relMapEl = document.getElementById("rel-map-page");
    if (relMapEl) relMapEl.style.display = "none";
    const dialogueEl = document.getElementById("dialogue-page");
    if (dialogueEl) dialogueEl.style.display = "none";
    const heightEl = document.getElementById("height-compare-page");
    if (heightEl) heightEl.style.display = "none";
    const timelineEl = document.getElementById("timeline-page");
    if (timelineEl) timelineEl.style.display = "none";
    
    const target = document.getElementById(pageId);
    if (target) target.style.display = "block";
    
    const sidebar = document.getElementById("sidebar");
    if (sidebar && sidebar.classList.contains("open")) sidebar.classList.remove("open");
    
    document.querySelectorAll(".bottom-nav-item").forEach(btn => btn.classList.remove("active"));
    if (pageId === "home-page") document.getElementById("bnav-home")?.classList.add("active");
    if (pageId === "character-page") document.getElementById("bnav-char")?.classList.add("active");
    if (pageId === "lore-page") document.getElementById("bnav-lore")?.classList.add("active");
    if (pageId === "novel-page") document.getElementById("bnav-novel")?.classList.add("active");

    window.scrollTo(0, 0);

    if (pageId === "home-page") {
        initGallerySlider();
        if (typeof renderHomeBirthdaySpotlight === "function") renderHomeBirthdaySpotlight();
    }
    if (pageId === "novel-page") updateNovelSelectors();
    if (pageId === "lore-page") renderLoreEntries();
    if (pageId === "board-page") renderBoard();
    if (pageId === "rel-map-page") renderRelationshipMap();
    if (pageId === "dialogue-page") {
        updateDialogueActors();
        renderDialogueTimeline();
    }
    if (pageId === "height-compare-page" && typeof renderHeightComparison === "function") renderHeightComparison();
    if (pageId === "timeline-page" && typeof renderTimelineEntries === "function") renderTimelineEntries();
}
window.switchPage = switchPage;

// =========================================
// ギャラリー（無限カルーセル）
// =========================================
function renderGalleryList() {
    const list = document.getElementById("galleryList");
    if (!list) return;
    if (galleryImages.length === 0) {
        list.innerHTML = '<span style="color:var(--text-muted); font-size:12px;">画像が登録されていません。</span>';
        return;
    }
    list.innerHTML = galleryImages.map((img, idx) => `
        <div class="gallery-list-item">
            <img src="${img.url}">
            <span>${escapeHTML(img.title)}</span>
            <div style="display: inline-block; margin-left: 6px;">
                <button type="button" onclick="moveGalleryImage(${idx}, -1)" ${idx === 0 ? 'disabled' : ''} style="cursor:pointer; border:none; background:none;">▲</button>
                <button type="button" onclick="moveGalleryImage(${idx}, 1)" ${idx === galleryImages.length - 1 ? 'disabled' : ''} style="cursor:pointer; border:none; background:none;">▼</button>
            </div>
            <button type="button" onclick="deleteGalleryImage(${idx})" style="color:var(--danger); border:none; background:none; cursor:pointer; font-weight:bold; font-size:14px;">✕</button>
        </div>
    `).join('');
}

function moveGalleryImage(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= galleryImages.length) return;
    const temp = galleryImages[index];
    galleryImages[index] = galleryImages[newIndex];
    galleryImages[newIndex] = temp;
    localStorage.setItem("gallery_images", JSON.stringify(galleryImages));
    initGallerySlider(); 
}
window.moveGalleryImage = moveGalleryImage;

function addGalleryImage() {
    let title = document.getElementById("galleryImageTitle").value.trim() || "ギャラリー画像";
    const fileInput = document.getElementById("galleryImageFile");
    if (!fileInput.files || !fileInput.files[0]) return alert("画像ファイルを選択してください！");

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const MAX_WIDTH = 1600;
            let width = img.width, height = img.height;
            if (width > MAX_WIDTH) {
                height = Math.round(height * (MAX_WIDTH / width));
                width = MAX_WIDTH;
            }
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL("image/jpeg", 0.85);

            galleryImages.push({
                id: Date.now().toString(),
                title: title,
                url: compressedBase64
            });
            localStorage.setItem("gallery_images", JSON.stringify(galleryImages));
            initGallerySlider();
            document.getElementById("galleryImageTitle").value = "";
            fileInput.value = ""; 
            alert("ギャラリー画像を追加しました！");
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}
window.addGalleryImage = addGalleryImage;

async function deleteGalleryImage(index) {
    if (!confirm("この画像をギャラリーから削除しますか？")) return;
    const target = galleryImages[index];
    galleryImages.splice(index, 1);
    localStorage.setItem("gallery_images", JSON.stringify(galleryImages));
    initGallerySlider();

    const pageId = new URLSearchParams(window.location.search).get('id');
    if (pageId && target && target.id) {
        try {
            await db.collection("pages").doc(pageId).collection("galleryImages").doc(String(target.id)).delete();
        } catch (e) {}
    }
}
window.deleteGalleryImage = deleteGalleryImage;

function initGallerySlider() {
    renderGalleryList();
    const container = document.getElementById("gallerySliderContainer");
    const track = document.getElementById("gallerySliderTrack");
    const fixed = document.getElementById("galleryFixedDisplay");
    if (!container || !track || !fixed) return;

    if (galleryImages.length === 0) {
        container.style.display = "none";
        fixed.style.display = "none";
        return;
    }

    if (galleryImages.length === 1) {
        container.style.display = "none";
        fixed.style.display = "block";
        fixed.innerHTML = `
            <img src="${galleryImages[0].url}">
            <div class="slide-caption">${escapeHTML(galleryImages[0].title)}</div>
        `;
    } else {
        container.style.display = "block";
        fixed.style.display = "none";
        const gallerySet = [...galleryImages, ...galleryImages, ...galleryImages, ...galleryImages]; 
        track.innerHTML = gallerySet.map(img => `
            <div class="slide-item">
                <img src="${img.url}">
                <div class="slide-caption">${escapeHTML(img.title)}</div>
            </div>
        `).join('');
        track.style.width = "max-content";
        track.style.animation = 'none';
        track.offsetHeight;
        const animationDuration = galleryImages.length * 8; 
        track.style.animation = `flowGallery ${animationDuration}s linear infinite`;
    }
}
window.initGallerySlider = initGallerySlider;

// =========================================
// 小説・ストーリー連動ロジック
// =========================================
function updateNovelSelectors() {
    const worldContainer = document.getElementById("novel-world-buttons");
    const groupContainer = document.getElementById("novel-group-buttons");
    const charContainer = document.getElementById("novel-char-buttons");
    if (!worldContainer) return;

    const pool = getVisibleCharacters();
    const worlds = [...new Set(pool.map(c => c.world || "未設定"))];
    worldContainer.innerHTML = "";
    if (!currentNovelWorld && worlds.length > 0) currentNovelWorld = worlds[0];

    worlds.forEach(w => {
        const btn = document.createElement("button"); btn.textContent = w; btn.className = `proseka-btn ${currentNovelWorld === w ? 'active' : ''}`;
        btn.onclick = () => { currentNovelWorld = w; currentNovelGroup = ""; currentNovelCharId = null; resetWorkspaceIdx(); updateNovelSelectors(); }; worldContainer.appendChild(btn);
    });

    groupContainer.innerHTML = "";
    if (currentNovelWorld) {
        const filteredChars = pool.filter(c => (c.world || "未設定") === currentNovelWorld);
        const groups = [...new Set(filteredChars.map(c => c.group || "無所属"))];
        if (!currentNovelGroup && groups.length > 0) currentNovelGroup = groups[0];
        groups.forEach(g => {
            const btn = document.createElement("button"); btn.textContent = g; btn.className = `proseka-btn ${currentNovelGroup === g ? 'active' : ''}`;
            btn.onclick = () => { currentNovelGroup = g; currentNovelCharId = null; resetWorkspaceIdx(); updateNovelSelectors(); }; groupContainer.appendChild(btn);
        });
    }

    charContainer.innerHTML = "";
    if (currentNovelWorld && currentNovelGroup) {
        const targetChars = pool.filter(c => (c.world || "未設定") === currentNovelWorld && (c.group || "無所属") === currentNovelGroup);
        targetChars.forEach(c => {
            const btn = document.createElement("button"); btn.textContent = c.name; btn.className = `proseka-btn ${currentNovelCharId === c.id ? 'active' : ''}`;
            btn.onclick = () => { selectNovelCharacter(c); updateNovelSelectors(); }; charContainer.appendChild(btn);
        });
    }

    if (!currentNovelCharId) { document.getElementById("novel-workspace").style.display = "none"; }
    renderNovelSeriesOverview();
}
window.updateNovelSelectors = updateNovelSelectors;

function getVisibleCharacters() {
    const viewer = auth.currentUser;
    const canSeePrivate = !!(viewer && currentPageAuthorId && viewer.uid === currentPageAuthorId && !previewAsVisitor);
    return characters.filter(c => !c.deletedAt && (canSeePrivate || c.isPublic !== false));
}

async function persistCharacterToCloud(char) {
    const pageId = new URLSearchParams(window.location.search).get('id');
    const user = auth.currentUser;
    if (!pageId || !user || !currentPageAuthorId || user.uid !== currentPageAuthorId) return false;
    try {
        await db.collection("pages").doc(pageId).collection("characters").doc(String(char.id)).set(char);
        return true;
    } catch (e) {
        return false;
    }
}

function touchSeries(series) { if (series) series.updatedAt = Date.now(); }

function renderNovelSeriesOverview() {
    const box = document.getElementById("novel-series-overview");
    if (!box) return;
    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : true;
    const rows = [];
    getVisibleCharacters().forEach(c => {
        (c.novelSeries || []).forEach((ser, idx) => {
            if (!editable && ser.isPublic === false) return;
            const visibleEps = editable ? (ser.episodes || []) : (ser.episodes || []).filter(ep => ep.isPublic !== false);
            rows.push({ c, ser, idx, epCount: visibleEps.length });
        });
    });
    if (rows.length === 0) {
        box.innerHTML = `<p style="color:var(--text-muted); font-size:13px; margin:0;">${t("novel.overviewEmpty")}</p>`;
        return;
    }
    rows.sort((a, b) => (b.ser.updatedAt || 0) - (a.ser.updatedAt || 0));
    box.innerHTML = rows.map(r => {
        const date = r.ser.updatedAt ? new Date(r.ser.updatedAt).toLocaleDateString(currentLang) : "";
        const privPill = (editable && r.ser.isPublic === false) ? `<span class="novel-private-pill">非公開</span>` : "";
        return `<div class="novel-overview-row" onclick="jumpToNovelSeries(${r.c.id}, ${r.idx})">
            <div style="font-weight:bold;">${escapeHTML(r.ser.name)}${privPill}</div>
            <div style="font-size:12px; color:var(--text-muted);">${escapeHTML(r.c.name)} ・ ${r.epCount}${t("novel.episodeUnit")}${date ? " ・ " + date : ""}</div>
        </div>`;
    }).join("");
}
window.renderNovelSeriesOverview = renderNovelSeriesOverview;

function jumpToNovelSeries(charId, seriesIdx) {
    const c = characters.find(x => x.id === charId);
    if (!c) return;
    currentNovelWorld = c.world || "未設定";
    currentNovelGroup = c.group || "無所属";
    selectNovelCharacter(c);
    currentSeriesIdx = seriesIdx;
    currentEpisodeIdx = -1;
    renderSeriesSelect();
    updateNovelSelectors();
    document.getElementById("novel-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
window.jumpToNovelSeries = jumpToNovelSeries;

function resetWorkspaceIdx() { currentSeriesIdx = -1; currentEpisodeIdx = -1; }

function selectNovelCharacter(char) {
    currentNovelCharId = char.id;
    document.getElementById("novel-workspace").style.display = "block";
    document.getElementById("selected-char-title").textContent = `${char.name} のストーリー執筆`;
    if (!char.novelSeries) char.novelSeries = [];
    currentSeriesIdx = char.novelSeries.length > 0 ? 0 : -1;
    currentEpisodeIdx = -1;
    renderSeriesSelect();
}
window.selectNovelCharacter = selectNovelCharacter;

function renderSeriesSelect() {
    const char = characters.find(c => c.id === currentNovelCharId);
    const select = document.getElementById("novel-series-select");
    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : true;
    const visCheckbox = document.getElementById("novelSeriesPublicCheckbox");

    if (!char || !char.novelSeries || char.novelSeries.length === 0) {
        if (select) select.innerHTML = '<option value="-1">-- 作品がありません --</option>';
        document.getElementById("episode-section").style.display = "none";
        document.getElementById("editor-section").style.display = "none";
        currentSeriesIdx = -1;
        return;
    }

    const visibleEntries = char.novelSeries
        .map((ser, idx) => ({ ser, idx }))
        .filter(item => editable || item.ser.isPublic !== false);

    if (visibleEntries.length === 0) {
        if (select) select.innerHTML = '<option value="-1">-- 公開中の作品がありません --</option>';
        document.getElementById("episode-section").style.display = "none";
        document.getElementById("editor-section").style.display = "none";
        currentSeriesIdx = -1;
        return;
    }

    if (!visibleEntries.some(item => item.idx === currentSeriesIdx)) {
        currentSeriesIdx = visibleEntries[0].idx;
    }

    if (select) {
        select.innerHTML = visibleEntries.map(({ ser, idx }) => {
            const epCount = editable ? (ser.episodes || []).length : (ser.episodes || []).filter(e => e.isPublic !== false).length;
            const privTag = (editable && ser.isPublic === false) ? " [非公開]" : "";
            return `<option value="${idx}" ${currentSeriesIdx === idx ? 'selected' : ''}>${escapeHTML(ser.name)} (${epCount}話)${privTag}</option>`;
        }).join('');
    }
    const activeSer = char.novelSeries[currentSeriesIdx];
    if (visCheckbox && activeSer) {
        visCheckbox.checked = (activeSer.isPublic !== false);
    }
    document.getElementById("episode-section").style.display = "block";
    renderEpisodeTabs();
}

function toggleNovelSeriesVisibility(isPublic) {
    if (!canEditCurrentPage()) return;
    const char = characters.find(c => c.id === currentNovelCharId);
    if (!char || currentSeriesIdx === -1 || !char.novelSeries || !char.novelSeries[currentSeriesIdx]) return;
    char.novelSeries[currentSeriesIdx].isPublic = !!isPublic;
    touchSeries(char.novelSeries[currentSeriesIdx]);
    localStorage.setItem("characters", JSON.stringify(characters));
    renderSeriesSelect();
    renderNovelSeriesOverview();
    persistCharacterToCloud(char);
    showSaveToast(isPublic ? "シリーズを公開設定にしました" : "シリーズを非公開にしました", "info");
}
window.toggleNovelSeriesVisibility = toggleNovelSeriesVisibility;

function toggleNovelEpisodeVisibility(isPublic) {
    if (!canEditCurrentPage()) return;
    const char = characters.find(c => c.id === currentNovelCharId);
    if (!char || currentSeriesIdx === -1 || currentEpisodeIdx === -1) return;
    const ep = char.novelSeries?.[currentSeriesIdx]?.episodes?.[currentEpisodeIdx];
    if (!ep) return;
    ep.isPublic = !!isPublic;
    touchSeries(char.novelSeries[currentSeriesIdx]);
    localStorage.setItem("characters", JSON.stringify(characters));
    renderEpisodeTabs();
    renderNovelSeriesOverview();
    persistCharacterToCloud(char);
    showSaveToast(isPublic ? "この話を公開設定にしました" : "この話を非公開にしました", "info");
}
window.toggleNovelEpisodeVisibility = toggleNovelEpisodeVisibility;

function changeSeries() { 
    currentSeriesIdx = Number(document.getElementById("novel-series-select").value); 
    currentEpisodeIdx = -1; 
    renderSeriesSelect();
}
window.changeSeries = changeSeries;

function createNewSeries() {
    const char = characters.find(c => String(c.id) === String(currentNovelCharId)); 
    if (!char) return alert("キャラクターが選択されていません。先にキャラクターを選んでください。");
    if (!char.novelSeries) char.novelSeries = [];
    const title = prompt("新しいシリーズのタイトルを入力してください：");
    if (!title || !title.trim()) return;
    char.novelSeries.push({ name: title.trim(), isPublic: true, episodes: [], updatedAt: Date.now() });
    currentSeriesIdx = char.novelSeries.length - 1; 
    currentEpisodeIdx = -1;
    localStorage.setItem("characters", JSON.stringify(characters)); 
    renderSeriesSelect();
    persistCharacterToCloud(char); 
    renderNovelSeriesOverview();
}
window.createNewSeries = createNewSeries;

function renameCurrentSeries() {
    const char = characters.find(c => c.id === currentNovelCharId);
    if (currentSeriesIdx === -1 || !char || !char.novelSeries[currentSeriesIdx]) return;
    const series = char.novelSeries[currentSeriesIdx];
    const title = prompt(t("novel.renamePrompt"), series.name);
    if (!title || !title.trim()) return;
    series.name = title.trim();
    touchSeries(series);
    localStorage.setItem("characters", JSON.stringify(characters));
    renderSeriesSelect(); 
    renderNovelSeriesOverview(); 
    persistCharacterToCloud(char);
}
window.renameCurrentSeries = renameCurrentSeries;

function deleteCurrentSeries() {
    const char = characters.find(c => c.id === currentNovelCharId); if (currentSeriesIdx === -1 || !char) return;
    if (!confirm(`作品「${char.novelSeries[currentSeriesIdx].name}」を削除しますか？`)) return;
    char.novelSeries.splice(currentSeriesIdx, 1);
    currentSeriesIdx = char.novelSeries.length > 0 ? 0 : -1; currentEpisodeIdx = -1;
    localStorage.setItem("characters", JSON.stringify(characters)); 
    renderSeriesSelect(); 
    persistCharacterToCloud(char); 
    renderNovelSeriesOverview();
}
window.deleteCurrentSeries = deleteCurrentSeries;

function renderEpisodeTabs() {
    const char = characters.find(c => c.id === currentNovelCharId);
    const container = document.getElementById("episode-tab-container");
    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : true;
    if (!char || currentSeriesIdx === -1 || !char.novelSeries[currentSeriesIdx]) {
        if (container) container.innerHTML = "";
        document.getElementById("editor-section").style.display = "none";
        return;
    }
    const eps = char.novelSeries[currentSeriesIdx].episodes || [];
    const visibleEps = eps
        .map((ep, idx) => ({ ep, idx }))
        .filter(item => editable || item.ep.isPublic !== false);

    if (visibleEps.length === 0) {
        if (container) {
            container.innerHTML = `<span style="color:var(--text-muted); font-size:13px;">${editable ? "まだエピソードがありません。" : "公開中のエピソードがありません。"}</span>`;
        }
        document.getElementById("editor-section").style.display = "none";
        currentEpisodeIdx = -1;
        return;
    }

    if (!visibleEps.some(item => item.idx === currentEpisodeIdx)) {
        currentEpisodeIdx = visibleEps[0].idx;
    }

    if (container) {
        container.innerHTML = visibleEps.map(({ ep, idx }) => {
            const privMark = (editable && ep.isPublic === false) ? ` <span class="novel-private-pill">非公開</span>` : "";
            return `<button type="button" onclick="selectEpisode(${idx})" class="proseka-btn ${currentEpisodeIdx === idx ? 'active' : ''}">${escapeHTML(ep.title || `第${idx + 1}話`)}${privMark}</button>`;
        }).join('');
    }
    openEditor();
}

function selectEpisode(idx) { currentEpisodeIdx = idx; renderEpisodeTabs(); }
window.selectEpisode = selectEpisode;

function openEditor() {
    const char = characters.find(c => c.id === currentNovelCharId);
    if (!char || currentSeriesIdx === -1 || currentEpisodeIdx === -1) return;
    const ep = char.novelSeries[currentSeriesIdx]?.episodes?.[currentEpisodeIdx];
    if (!ep) return;
    document.getElementById("editor-section").style.display = "block";
    document.getElementById("episode-title").value = ep.title || "";
    document.getElementById("novel-output").value = ep.content || "";
    document.getElementById("novel-theme").value = "";
    const epVisCheckbox = document.getElementById("novelEpisodePublicCheckbox");
    if (epVisCheckbox) epVisCheckbox.checked = (ep.isPublic !== false);
    applyNovelWritingModeUI();
}

function createNewEpisode() {
    const char = characters.find(c => c.id === currentNovelCharId); if (currentSeriesIdx === -1 || !char) return;
    const eps = char.novelSeries[currentSeriesIdx].episodes;
    eps.push({ title: `第${eps.length+1}話`, content: "", isPublic: true });
    currentEpisodeIdx = eps.length - 1; touchSeries(char.novelSeries[currentSeriesIdx]);
    localStorage.setItem("characters", JSON.stringify(characters)); renderSeriesSelect();
    persistCharacterToCloud(char); renderNovelSeriesOverview();
}
window.createNewEpisode = createNewEpisode;

function deleteCurrentEpisode() {
    const char = characters.find(c => c.id === currentNovelCharId); if (currentSeriesIdx === -1 || currentEpisodeIdx === -1 || !char) return;
    if (!confirm(`この話を削除しますか？`)) return;
    char.novelSeries[currentSeriesIdx].episodes.splice(currentEpisodeIdx, 1);
    currentEpisodeIdx = char.novelSeries[currentSeriesIdx].episodes.length > 0 ? 0 : -1;
    touchSeries(char.novelSeries[currentSeriesIdx]);
    localStorage.setItem("characters", JSON.stringify(characters)); renderSeriesSelect(); display();
    persistCharacterToCloud(char); renderNovelSeriesOverview();
}
window.deleteCurrentEpisode = deleteCurrentEpisode;

async function generateNovelOnPage() {
    if (!currentNovelCharId || currentSeriesIdx === -1 || currentEpisodeIdx === -1) return alert("話を選択してください。");
    const char = characters.find(c => c.id === currentNovelCharId);
    const seriesName = char.novelSeries[currentSeriesIdx].name;
    const epTitle = document.getElementById("episode-title").value || "新エピソード";
    let context = "";
    const currentEps = char.novelSeries[currentSeriesIdx].episodes;
    if (currentEpisodeIdx > 0) { 
        context = "\n【これまでの話の流れ】\n"; 
        for (let i = Math.max(0, currentEpisodeIdx - 2); i < currentEpisodeIdx; i++) { 
            context += `・${currentEps[i].title}: ${currentEps[i].content.substring(0, 100)}...\n`; 
        } 
    }
    const theme = document.getElementById("novel-theme").value;
    const outputField = document.getElementById("novel-output");
    outputField.value = "AIが執筆中... ページを閉じずにお待ちください...";
    let prompt = `以下のキャラクター設定とシリーズ構想に基づき、臨場感あふれる小説を1話作成してください。\n\n【世界線】:${char.world || "未設定"}\n【所属組織】:${char.group || "無所属"}\n【名前】:${char.name}\n【性格】:${char.personality || "未設定"}\n【作品シリーズ名】: ${seriesName}\n【今回執筆する話のタイトル】: ${epTitle}\n${context}\n`;
    if (theme) prompt += `\n【指定シチュエーション】:\n${theme}\n\n`;
    prompt += `指示：400〜600文字程度で、会話文（「」）を活かした魅力的な文体で書いてください。`;
    try {
        outputField.value = await callAI(prompt);
    } catch (e) { outputField.value = t("ai.errorPrefix") + e.message; }
}
window.generateNovelOnPage = generateNovelOnPage;

async function saveNovelText() {
    if (!currentNovelCharId || currentSeriesIdx === -1 || currentEpisodeIdx === -1) return;
    const char = characters.find(c => c.id === currentNovelCharId); if (!char) return;
    const inputTitle = document.getElementById("episode-title").value.trim();
    const ep = char.novelSeries[currentSeriesIdx].episodes[currentEpisodeIdx];
    ep.title = inputTitle || `第${currentEpisodeIdx+1}話`;
    ep.content = document.getElementById("novel-output").value;
    const epVisCheckbox = document.getElementById("novelEpisodePublicCheckbox");
    if (epVisCheckbox) ep.isPublic = !!epVisCheckbox.checked;
    touchSeries(char.novelSeries[currentSeriesIdx]);
    localStorage.setItem("characters", JSON.stringify(characters)); 
    renderSeriesSelect(); 
    display(); 
    renderNovelSeriesOverview();
    const savedToCloud = await persistCharacterToCloud(char);
    showSaveToast(savedToCloud ? t("novel.saved") : t("novel.savedLocalOnly"), "success");
}
window.saveNovelText = saveNovelText;

// =========================================
// ネットに保存
// =========================================
function sanitizeForFirestore(val) {
    if (val === undefined) return null;
    if (Array.isArray(val)) return val.map(sanitizeForFirestore);
    if (val && typeof val === "object") {
        const out = {};
        for (const k of Object.keys(val)) {
            if (val[k] !== undefined) out[k] = sanitizeForFirestore(val[k]);
        }
        return out;
    }
    return val;
}

async function commitSubcollectionInChunks(pageId) {
    const writes = [];
    characters.forEach(c => {
        writes.push({
            ref: db.collection("pages").doc(pageId).collection("characters").doc(String(c.id)),
            data: sanitizeForFirestore(c)
        });
    });
    galleryImages.forEach((img, idx) => {
        writes.push({
            ref: db.collection("pages").doc(pageId).collection("galleryImages").doc(String(img.id)),
            data: sanitizeForFirestore({ ...img, order: idx })
        });
    });

    const CHUNK = 400;
    for (let i = 0; i < writes.length; i += CHUNK) {
        const batch = db.batch();
        writes.slice(i, i + CHUNK).forEach(w => batch.set(w.ref, w.data));
        await batch.commit();
    }
}

function showSaveToast(message = "保存しました！", type = "success", duration = 3200) {
    let container = document.getElementById("toastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        container.className = "toast-container";
        container.setAttribute("aria-live", "polite");
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-item ${type}`;
    const iconSvg = type === "error"
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="8 12 11 15 16 9"></polyline></svg>`;

    toast.innerHTML = `<span class="toast-icon">${iconSvg}</span><span>${escapeHTML(message)}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.classList.add("show");
        });
    });

    setTimeout(() => {
        toast.classList.remove("show");
        toast.classList.add("hiding");
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 380);
    }, duration);
}
window.showSaveToast = showSaveToast;

async function publishToWeb() {
    const user = auth.currentUser;
    if (!user) return alert("保存するにはログインが必要です！");

    const urlParams = new URLSearchParams(window.location.search);
    let pageId = urlParams.get('id');

    const publishBtn = document.getElementById("publishBtn");
    const prevBtnText = publishBtn ? publishBtn.textContent : "";
    if (publishBtn) {
        publishBtn.disabled = true;
        publishBtn.textContent = "保存中...";
    }

    const pageData = {
        authorId: user.uid,
        worldLore: JSON.stringify(worldLore || []),
        timelineData: JSON.stringify(timelineEvents || []),
        boardData: JSON.stringify(boardConfig || {}),
        relMapData: JSON.stringify(relMapPositions || {}),
        dialogueData: JSON.stringify(dialogueConfig || normalizeDialogueConfig(null)),
        heightAdjustData: JSON.stringify(heightArtAdjustments || {}),
        themeSettings: JSON.stringify({
            bgColor: localStorage.getItem("custom_theme_bgcolor") || "",
            bgImage: localStorage.getItem("custom_theme_bg") || "",
            bgFit: localStorage.getItem("custom_theme_bg_fit") || "cover",
            worldThemes: localStorage.getItem("custom_world_themes") || "{}"
        }),
        galleryImagesJson: firebase.firestore.FieldValue.delete(),
        galleryImages: firebase.firestore.FieldValue.delete()
    };

    try {
        if (pageId) {
            if (currentPageAuthorId && currentPageAuthorId !== user.uid) {
                return alert("他人の図鑑は上書き保存できません！");
            }
            await db.collection("pages").doc(pageId).set(pageData, { merge: true });
            await commitSubcollectionInChunks(pageId);

            showSaveToast("ネットに保存しました！", "success");
            await loadPageData();

        } else {
            pageId = user.uid;
            const pageRef = db.collection("pages").doc(pageId);
            const existing = await pageRef.get();
            if (existing.exists) {
                alert(t("header.pageAlreadyExists"));
                window.location.href = `?id=${pageId}`;
                return;
            }
            await pageRef.set({
                ...pageData,
                visibility: "public",
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            await commitSubcollectionInChunks(pageId);

            sessionStorage.setItem("pending_toast", "新しい図鑑をネットに公開しました！");
            window.location.href = `?id=${pageId}`;
        }
    } catch (error) {
        console.error("保存エラー:", error);
        const msg = (error && error.message) ? `\n(${error.message})` : "";
        showSaveToast("保存に失敗しました", "error", 3800);
        alert("保存に失敗しました。画像データが大きすぎるか、通信・権限エラーの可能性があります。" + msg);
    } finally {
        if (publishBtn) {
            publishBtn.disabled = false;
            publishBtn.textContent = prevBtnText || "ネットに保存";
        }
    }
}
window.publishToWeb = publishToWeb;

function compressImage(file, maxSize = 1400) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = function(event) {
            const img = new Image();
            img.onerror = reject;
            img.onload = function() {
                const canvas = document.createElement('canvas');
                let width = img.width, height = img.height;
                if (width > height && width > maxSize) {
                    height = Math.round(height * (maxSize / width));
                    width = maxSize;
                } else if (height > maxSize) {
                    width = Math.round(width * (maxSize / height));
                    height = maxSize;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.82));
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
}

function addYoutubeInputField(value = "") {
    const container = document.getElementById("youtubeContainer");
    if (!container) return;
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.gap = "6px";
    div.style.marginBottom = "6px";
    div.innerHTML = `
        <input type="text" class="char-youtube-url" placeholder="https://www.youtube.com/watch?v=..." value="${escapeHTML(value)}" style="flex:1; margin:0; font-size:12px;">
        <button type="button" onclick="this.parentElement.remove()" class="header-btn danger" style="padding:4px 8px; font-size:11px;">削除</button>
    `;
    container.appendChild(div);
}
window.addYoutubeInputField = addYoutubeInputField;

function addMemoInputField(title = "", content = "") {
    const container = document.getElementById("memoContainer");
    if (!container) return;
    const div = document.createElement("div");
    div.className = "memo-input-group";
    div.style.cssText = "display: flex; flex-direction: column; gap: 4px; padding: 10px; border: 1px dashed var(--card-border); border-radius: 6px; background: rgba(0,0,0,0.02); margin-bottom: 8px;";
    div.innerHTML = `
        <input type="text" class="memo-title" placeholder="タイトル（生い立ち、能力、口調など）" value="${escapeHTML(title)}" style="font-weight: bold; margin:0; font-size:13px;">
        <textarea class="memo-content" placeholder="メモの内容" style="height: 75px; margin:0; font-size:13px;">${escapeHTML(content)}</textarea>
        <button type="button" onclick="this.parentElement.remove()" class="header-btn danger" style="align-self: flex-end; padding: 2px 8px; font-size: 11px; margin-top: 4px;">枠を削除</button>
    `;
    container.appendChild(div);
}
window.addMemoInputField = addMemoInputField;

// =========================================
// スタートページ＆プロフィール
// =========================================
function togglePageVisibility() {
    const urlParams = new URLSearchParams(window.location.search);
    const currentId = urlParams.get('id');
    
    const portalHomeView = document.getElementById("portal-home-view");
    const authorView = document.getElementById("author-view");
    const menuBtn = document.querySelector('button[onclick="toggleSidebar()"]'); 
    const publishBtn = document.getElementById("publishBtn");

    if (typeof checkAdminStatus === "function") checkAdminStatus();

    if (!currentId) {
        if (portalHomeView) portalHomeView.style.display = "block";
        if (authorView) authorView.style.display = "none";
        if (menuBtn) menuBtn.style.display = "none";
        if (publishBtn) publishBtn.style.display = "none";
        currentPageAuthorId = null;
        loadPortalNews();  
        loadCreatorList(); 
    } else {
        if (portalHomeView) portalHomeView.style.display = "none";
        if (authorView) authorView.style.display = "block";
        if (menuBtn) menuBtn.style.display = "inline-block";
        if (publishBtn) publishBtn.style.display = "inline-block";
        loadAuthorProfile(currentPageAuthorId || currentId); 
        addReturnToPortalButton();
    }
}

function addReturnToPortalButton() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar && !document.getElementById("return-portal-btn")) {
        const btn = document.createElement("button");
        btn.id = "return-portal-btn";
        btn.innerHTML = "← スタートページに戻る";
        btn.style.cssText = "display: block; width: 90%; margin: 20px auto 10px; padding: 12px; background: var(--secondary); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;";
        btn.onclick = () => {
            const currentUrl = new URL(window.location.href);
            currentUrl.search = ""; // クエリパラメータ(?id=...)を消去
            window.location.href = currentUrl.toString();
        };
        sidebar.appendChild(btn);
    }
}

const SNS_PRESETS = [
    { 
        key: "x", 
        label: "X (Twitter)", 
        color: "#111827", 
        icon: "X",
        iconSlug: "x",
        svg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
    },
    { 
        key: "pixiv", 
        label: "pixiv", 
        color: "#0096fa", 
        icon: "P",
        iconSlug: "pixiv",
        svg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.14 6.84 9.47-.09-.81-.17-2.06.04-2.95.19-.8 1.22-5.18 1.22-5.18s-.31-.62-.31-1.55c0-1.45.84-2.53 1.89-2.53.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.49-.25 1.04.52 1.89 1.54 1.89 1.85 0 3.27-1.95 3.27-4.77 0-2.49-1.79-4.24-4.35-4.24-2.96 0-4.7 2.22-4.7 4.51 0 .89.34 1.85.77 2.37.08.1.1.19.07.3-.08.33-.26 1.05-.29 1.19-.05.2-.17.24-.38.15-1.42-.66-2.31-2.73-2.31-4.4 0-3.58 2.6-6.87 7.5-6.87 3.94 0 7 2.81 7 6.56 0 3.91-2.47 7.07-5.89 7.07-1.15 0-2.23-.6-2.6-1.31l-.71 2.7c-.26 1-.96 2.24-1.43 3 1.08.33 2.23.51 3.42.51 5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>`
    },
    { 
        key: "instagram", 
        label: "Instagram", 
        color: "#d6249f", 
        icon: "IG",
        iconSlug: "instagram",
        svg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`
    },
    { 
        key: "skeb", 
        label: "Skeb", 
        color: "#00b4bb", 
        icon: "S",
        iconSlug: null,
        svg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><path d="M7 6h10a4 4 0 0 1 0 8H7a4 4 0 0 0 0 8h10"/></svg>`
    },
    { 
        key: "poipiku", 
        label: "ぽいぴく", 
        color: "#ff7ab8", 
        icon: "Po",
        iconSlug: null,
        svg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.5" fill="white"/><polyline points="21 15 16 10 5 21"/></svg>`
    },
    { 
        key: "privatter", 
        label: "Privatter", 
        color: "#7c3aed", 
        icon: "Pr",
        iconSlug: null,
        svg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`
    }
];

function snsIconBadgeHTML(preset, sizePx) {
    const pad = Math.round(sizePx * 0.18);
    if (preset.svg) {
        return `<span style="display:inline-flex; align-items:center; justify-content:center; width:${sizePx}px; height:${sizePx}px; border-radius:8px; background:${preset.color}; padding:${pad}px; box-sizing:border-box; flex-shrink:0;">${preset.svg}</span>`;
    }
    const textBadge = `<span style="display:inline-flex; align-items:center; justify-content:center; width:${sizePx}px; height:${sizePx}px; border-radius:8px; background:${preset.color}; color:white; font-size:${Math.round(sizePx * 0.42)}px; font-weight:bold; flex-shrink:0;">${escapeHTML(preset.icon)}</span>`;
    if (!preset.iconSlug) return textBadge;
    const fallbackAttr = textBadge.replace(/"/g, "&quot;");
    return `<span style="display:inline-flex; align-items:center; justify-content:center; width:${sizePx}px; height:${sizePx}px; border-radius:8px; background:${preset.color}; padding:${pad}px; box-sizing:border-box; flex-shrink:0;">` +
        `<img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${preset.iconSlug}.svg" alt="${escapeHTML(preset.label)}" style="width:100%; height:100%; filter:invert(1);" onerror="this.parentElement.outerHTML='${fallbackAttr.replace(/'/g, "\\'")}'"></span>`;
}

let tempProfileExtraLinks = [];

function loadAuthorProfile(authorId) {
    db.collection("profiles").doc(authorId).get().then((doc) => {
        const snsListEl = document.getElementById("profile-sns-list");
        if (doc.exists) {
            const data = doc.data();
            document.getElementById("profile-name").innerText = data.name || "名無しの作者";
            document.getElementById("profile-bio").innerText = data.bio || t("js.noBioYet");

            if (snsListEl) {
                let snsHTML = "";
                const sns = data.sns || {};
                SNS_PRESETS.forEach(preset => {
                    if (sns[preset.key]) {
                        snsHTML += `<a href="${escapeHTML(sns[preset.key])}" target="_blank" rel="noopener" title="${escapeHTML(preset.label)}" style="display:inline-flex; text-decoration:none; box-shadow:0 2px 5px rgba(0,0,0,0.12); border-radius:8px; transition:transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">${snsIconBadgeHTML(preset, 34)}</a>`;
                    }
                });
                if (Array.isArray(data.extraLinks)) {
                    data.extraLinks.forEach(l => {
                        snsHTML += `<a href="${escapeHTML(l.url)}" target="_blank" rel="noopener" style="display:inline-flex; align-items:center; gap:5px; background:var(--secondary); color:white; padding:5px 12px; border-radius:6px; font-size:12px; text-decoration:none; font-weight:bold;">${escapeHTML(l.title)}</a>`;
                    });
                }
                snsListEl.innerHTML = snsHTML;
            }
        }
        
        const user = auth.currentUser;
        const editBtn = document.getElementById("edit-profile-btn");
        if (user && user.uid === authorId) {
            if (editBtn) editBtn.style.display = "inline-block";
        } else {
            if (editBtn) editBtn.style.display = "none";
        }
    }).catch(console.error);
}

function openProfileEditor() {
    const user = auth.currentUser;
    if (!user) return;

    db.collection("profiles").doc(user.uid).get().then((doc) => {
        const data = doc.exists ? doc.data() : {};
        document.getElementById("profileEditName").value = data.name || user.displayName || "";
        document.getElementById("profileEditBio").value = data.bio || "";

        const snsContainer = document.getElementById("profileSnsInputs");
        const sns = data.sns || {};
        snsContainer.innerHTML = SNS_PRESETS.map(preset => `
            <div style="display:flex; align-items:center; gap:8px;">
                ${snsIconBadgeHTML(preset, 28)}
                <input id="sns-${preset.key}" placeholder="${preset.label}のURL" value="${escapeHTML(sns[preset.key] || "")}" style="flex:1; font-size:12px; margin:0;">
            </div>`).join("");

        tempProfileExtraLinks = Array.isArray(data.extraLinks) ? [...data.extraLinks] : [];
        renderProfileExtraLinkList();
        document.getElementById("profile-editor-panel").style.display = "block";
    }).catch(console.error);
}
window.openProfileEditor = openProfileEditor;

function closeProfileEditor() {
    document.getElementById("profile-editor-panel").style.display = "none";
}
window.closeProfileEditor = closeProfileEditor;

function addProfileExtraLink() {
    const title = document.getElementById("profileExtraLinkTitle").value.trim();
    const url = document.getElementById("profileExtraLinkUrl").value.trim();
    if (!title || !url) return alert("リンク名とURLを入力してください");
    tempProfileExtraLinks.push({ title, url });
    document.getElementById("profileExtraLinkTitle").value = "";
    document.getElementById("profileExtraLinkUrl").value = "";
    renderProfileExtraLinkList();
}
window.addProfileExtraLink = addProfileExtraLink;

function removeProfileExtraLink(idx) {
    tempProfileExtraLinks.splice(idx, 1);
    renderProfileExtraLinkList();
}
window.removeProfileExtraLink = removeProfileExtraLink;

function renderProfileExtraLinkList() {
    const list = document.getElementById("profileExtraLinkList");
    if (!list) return;
    list.innerHTML = tempProfileExtraLinks.map((l, i) => `
        <span style="background:var(--card-bg); border:1px solid var(--card-border); padding:3px 8px; border-radius:4px; font-size:12px; display:inline-flex; align-items:center; gap:4px;">
            ${escapeHTML(l.title)}
            <button type="button" onclick="removeProfileExtraLink(${i})" style="background:none; border:none; color:var(--danger); cursor:pointer;">×</button>
        </span>`).join("");
}

function saveAuthorProfile() {
    const user = auth.currentUser;
    if (!user) return;
    const newName = document.getElementById("profileEditName").value.trim();
    const newBio = document.getElementById("profileEditBio").value.trim();
    const sns = {};
    SNS_PRESETS.forEach(preset => {
        const el = document.getElementById(`sns-${preset.key}`);
        if (el && el.value.trim()) sns[preset.key] = el.value.trim();
    });

    db.collection("profiles").doc(user.uid).set({
        name: newName,
        bio: newBio,
        sns: sns,
        extraLinks: [...tempProfileExtraLinks],
        uid: user.uid,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).then(() => {
        alert("プロフィールを保存しました！");
        closeProfileEditor();
        loadAuthorProfile(user.uid);
        loadCreatorList();
    }).catch(console.error);
}
window.saveAuthorProfile = saveAuthorProfile;

let cachedCreatorProfiles = [];

function normalizeFuzzyText(str) {
    if (!str) return "";
    return str
        .toLowerCase()
        .replace(/[\u30a1-\u30f6]/g, match => String.fromCharCode(match.charCodeAt(0) - 0x60))
        .replace(/[\s\u3000\-_]/g, "");
}

function filterCreatorsList() {
    const query = normalizeFuzzyText(document.getElementById("creatorSearchInput")?.value || "");
    const filtered = cachedCreatorProfiles.filter(p => {
        if (!query) return true;
        const nameNorm = normalizeFuzzyText(p.name || "");
        const bioNorm = normalizeFuzzyText(p.bio || "");
        return nameNorm.includes(query) || bioNorm.includes(query);
    });
    renderCreatorList(filtered);
}
window.filterCreatorsList = filterCreatorsList;

function renderCreatorList(profiles) {
    const listContainer = document.getElementById("author-links-list");
    if (!listContainer) return;
    listContainer.innerHTML = "";
    if (!profiles || profiles.length === 0) {
        listContainer.innerHTML = `<p style='color:var(--text-muted); font-size:14px; grid-column:1/-1;'>該当するクリエイターは見つかりませんでした。</p>`;
        return;
    }
    profiles.forEach((data) => {
        const a = document.createElement("a");
        a.href = `?id=${data.uid}`;
        a.style.cssText = "display:block; padding:16px 20px; background:var(--card-bg-solid); border:1px solid var(--card-border); border-radius:12px; text-decoration:none; color:var(--text-main); font-weight:bold; box-shadow:var(--shadow-sm); transition:transform 0.2s;";
        a.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <span style="font-size:16px; color:var(--text-main);">${escapeHTML(data.name)}</span>
                    <p style="margin:4px 0 0; font-size:13px; color:var(--text-muted); font-weight:normal;">${escapeHTML(data.bio || t('js.noBioYet'))}</p>
                </div>
                <span style="color:var(--primary); font-size:18px;">➔</span>
            </div>
        `;
        listContainer.appendChild(a);
    });
}

function loadCreatorList() {
    const listContainer = document.getElementById("author-links-list");
    if (!listContainer) return;

    db.collection("profiles").orderBy("updatedAt", "desc").get().then(async (querySnapshot) => {
        if (querySnapshot.empty) {
            cachedCreatorProfiles = [];
            renderCreatorList([]);
            return;
        }

        const profiles = [];
        for (const doc of querySnapshot.docs) {
            const data = doc.data();
            let visibility = "public";
            try {
                const pageDoc = await db.collection("pages").doc(data.uid).get();
                if (pageDoc.exists && pageDoc.data().visibility) visibility = pageDoc.data().visibility;
            } catch (e) {}
            if (visibility !== "unlisted") profiles.push(data);
        }

        cachedCreatorProfiles = profiles;
        filterCreatorsList();
    }).catch(console.error);
}

function loadPortalNews() {
    db.collection("system").doc("portal").get().then((doc) => {
        const newsContent = document.getElementById("portal-news-content");
        if (!newsContent) return;
        newsContent.removeAttribute("data-i18n");
        if (doc.exists && doc.data().news) {
            newsContent.innerText = doc.data().news;
        } else {
            newsContent.innerText = t("portal.noNewsYet");
        }
    }).catch(console.error);
}

function loginAsAdmin() {
    const user = firebase.auth().currentUser;
    if (!user) return alert("管理者モードになるにはGoogleでログインしてください！");
    const myAdminUID = "7teBrNofgNNvZywmFFtoJIkwVFV2"; 
    if (user.uid === myAdminUID) {
        alert("管理者として認証されました！");
        localStorage.setItem("isAdminMode", "true");
        checkAdminStatus();
    } else {
        alert("権限がありません。");
    }
}
window.loginAsAdmin = loginAsAdmin;

function checkAdminStatus() {
    const user = firebase.auth().currentUser;
    const myAdminUID = "7teBrNofgNNvZywmFFtoJIkwVFV2";
    const isAdmin = !!(user && user.uid === myAdminUID && localStorage.getItem("isAdminMode") === "true");
    if (!isAdmin) {
        localStorage.removeItem("isAdminMode");
    }
    const editNewsBtn = document.getElementById("admin-edit-news-btn");
    const adminStatusText = document.getElementById("admin-status");
    const adminNewsEditor = document.getElementById("admin-news-editor");
    if (editNewsBtn) editNewsBtn.style.display = isAdmin ? "inline-block" : "none";
    if (adminStatusText) adminStatusText.innerText = isAdmin ? "管理者モード有効中" : "";
    if (!isAdmin && adminNewsEditor) adminNewsEditor.style.display = "none";
}
window.checkAdminStatus = checkAdminStatus;

function showAdminNewsEditor() {
    const editor = document.getElementById("admin-news-editor");
    const input = document.getElementById("admin-news-input");
    const currentNews = document.getElementById("portal-news-content")?.innerText || "";
    if (editor && input) {
        editor.style.display = "block";
        input.value = currentNews;
    }
}
window.showAdminNewsEditor = showAdminNewsEditor;

function savePortalNews() {
    const input = document.getElementById("admin-news-input");
    if (!input) return;
    db.collection("system").doc("portal").set({ news: input.value }, { merge: true }).then(() => {
        alert("お知らせを更新しました！");
        document.getElementById("admin-news-editor").style.display = "none";
        loadPortalNews();
    }).catch(() => alert("保存に失敗しました"));
}
window.savePortalNews = savePortalNews;

// =========================================
// YouTube ホバー再生 API
// =========================================
if (!document.getElementById("yt-api-script")) {
    const tag = document.createElement('script');
    tag.id = "yt-api-script";
    tag.src = "https://www.youtube.com/iframe_api";
    document.getElementsByTagName('script')[0].parentNode.insertBefore(tag, document.getElementsByTagName('script')[0]);
}

function setupHoverYouTubePlayers() {
    if (typeof YT === 'undefined' || !YT.Player) {
        setTimeout(setupHoverYouTubePlayers, 500);
        return;
    }

    document.querySelectorAll('.yt-hover-wrapper').forEach(wrapper => {
        if (wrapper.dataset.ytInitialized === "true") return;
        wrapper.dataset.ytInitialized = "true";
        const videoId = wrapper.dataset.ytId;
        const playerDiv = document.createElement('div');
        playerDiv.style.width = "100%";
        playerDiv.style.height = "100%";
        wrapper.appendChild(playerDiv);

        new YT.Player(playerDiv, {
            videoId: videoId,
            playerVars: { 'autoplay': 0, 'mute': 1, 'controls': 1, 'rel': 0 },
            events: {
                'onReady': function(event) {
                    wrapper.onmouseenter = () => event.target.playVideo();
                    wrapper.onmouseleave = () => event.target.pauseVideo();
                }
            }
        });
    });
}

// =========================================
// 外部サイト・ココフォリアインポート
// =========================================
function handleExternalImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const rawData = JSON.parse(e.target.result);
            let converted = null;
            if (rawData.iacharaVersion || (rawData.pc_name === undefined && rawData.memo && rawData.color)) {
                converted = parseIachara(rawData);
            } else if (rawData.pc_name !== undefined || rawData.data_title !== undefined) {
                converted = parseCharaChosho(rawData);
            } else if (rawData.characterName !== undefined && rawData.baseStatus !== undefined) {
                converted = parseYutosheet(rawData);
            } else {
                converted = parseGenericJson(rawData);
            }

            if (converted) {
                converted.id = Date.now();
                converted.favorite = false;
                converted.isOpen = false;
                converted.novelSeries = [];
                characters.unshift(converted);
                localStorage.setItem("characters", JSON.stringify(characters));
                display();
                alert(`「${converted.name}」をインポートしました！`);
            }
        } catch (error) {
            alert("データの読み込みに失敗しました。正しいJSONファイルかご確認ください。");
        }
    };
    reader.readAsText(file);
}
window.handleExternalImport = handleExternalImport;

function splitMemoIntoSections(rawText, fallbackTitle = "メモ") {
    if (!rawText) return [];
    const lines = String(rawText).split(/\r?\n/);
    const sections = [];
    let currentTitle = null;
    let currentLines = [];

    const pushCurrent = () => {
        if (currentTitle !== null) {
            const content = currentLines.join("\n").trim();
            if (content) sections.push({ title: currentTitle, content: content });
        }
    };

    lines.forEach(line => {
        const headerMatch = line.trim().match(/^(?:【(.+)】|\[(.+)\])$/);
        if (headerMatch) {
            pushCurrent();
            currentTitle = headerMatch[1] || headerMatch[2];
            currentLines = [];
        } else {
            if (currentTitle === null) currentTitle = fallbackTitle;
            currentLines.push(line);
        }
    });
    pushCurrent();

    if (sections.length === 0 && String(rawText).trim()) {
        return [{ title: fallbackTitle, content: String(rawText).trim() }];
    }
    return sections;
}

function parseIachara(data) {
    return {
        name: data.name || "いあきゃらのキャラ",
        personality: data.personality || "",
        memo: JSON.stringify(splitMemoIntoSections(data.memo || "", "いあきゃら")),
        world: data.gameSystem || "TRPG",
        group: "",
        tag: ["いあきゃら", data.gameSystem].filter(Boolean),
        birthday: data.birthday || "",
        color: data.color || "#5865f2",
        relations: [],
        links: data.id ? [{ title: "いあきゃら元ページ", url: `https://iachara.com/char/${data.id}` }] : [],
        images: data.image ? [{ title: "メイン立ち絵", url: data.image }] : [],
        youtubeUrls: []
    };
}

function parseCharaChosho(data) {
    const charName = data.pc_name || data.data_title || "保管所のキャラ";
    return {
        name: charName,
        personality: "",
        memo: JSON.stringify(splitMemoIntoSections(data.history || data.memo || "", "保管所")),
        world: data.game || "TRPG",
        group: "",
        tag: ["キャラクター保管所", data.game].filter(Boolean),
        birthday: "",
        color: "#ef4444",
        relations: [],
        links: [],
        images: data.image_url ? [{ title: "メイン立ち絵", url: data.image_url }] : [],
        youtubeUrls: []
    };
}

function parseYutosheet(data) {
    return {
        name: data.characterName || "ゆとシートのキャラ",
        personality: data.style || "",
        memo: JSON.stringify(splitMemoIntoSections(data.history || "", "ゆとシート")),
        world: data.game || "TRPG",
        group: "",
        tag: ["ゆとシート", data.game].filter(Boolean),
        birthday: "",
        color: "#10b981",
        relations: [],
        links: [],
        images: data.imageURL ? [{ title: "メイン立ち絵", url: data.imageURL }] : [],
        youtubeUrls: []
    };
}

function parseGenericJson(data) {
    return {
        name: data.name || data.pc_name || data.characterName || "インポートキャラ",
        personality: "",
        memo: JSON.stringify([{ title: "インポート情報", content: data.memo || JSON.stringify(data).substring(0, 200) }]),
        world: "外部世界",
        group: "",
        tag: ["外部インポート"],
        birthday: "",
        color: "#6b7280",
        relations: [],
        links: [],
        images: [],
        youtubeUrls: []
    };
}

function importFromExternalText() {
    const textarea = document.getElementById("externalTextImportArea");
    if (!textarea) return;
    const text = textarea.value.trim();
    if (!text) return alert("テキストエリアにデータを貼り付けてください！");

    let converted = null;
    if (text.startsWith("{") && text.endsWith("}")) {
        try {
            const rawData = JSON.parse(text);
            if (rawData.kind === "character" && rawData.data) {
                converted = parseCocofoliaAllSites(rawData.data, text);
            }
        } catch (e) {}
    }

    if (!converted) {
        converted = parseUniversalTextSheet(text);
    }

    if (!converted) {
        alert("データの形式を自動判別できませんでした。ココフォリア駒コピーかテキスト出力を貼り付けてみてください！");
        return;
    }

    converted.id = Date.now();
    converted.favorite = false;
    converted.isOpen = false;
    converted.novelSeries = [];

    characters.unshift(converted);
    localStorage.setItem("characters", JSON.stringify(characters));
    display();
    alert(`「${converted.name}」をインポートし、能力値を自動整理しました！`);
    textarea.value = "";
}
window.importFromExternalText = importFromExternalText;

function parseCocofoliaAllSites(data, rawText) {
    const charName = data.name || "インポートキャラ";
    const charColor = data.color || "#4f456e";
    let tags = ["インポート"];
    let links = [];
    if (data.externalUrl) {
        links.push({ title: "シート元ページ", url: data.externalUrl });
        if (data.externalUrl.includes("iachara.com")) tags.push("いあきゃら");
        else if (data.externalUrl.includes("character-sheets") || data.externalUrl.includes("vampire-blood.net")) tags.push("キャラクター保管所");
        else if (data.externalUrl.includes("yutorize.work")) tags.push("ゆとシート");
    }

    let memoSections = [];
    let statusAndParams = [];
    if (data.status && data.status.length > 0) {
        statusAndParams.push("▼ ステータス");
        data.status.forEach(s => statusAndParams.push(`・${s.label}: ${s.value} / ${s.max || s.value}`));
    }
    if (data.params && data.params.length > 0) {
        if (statusAndParams.length > 0) statusAndParams.push("");
        statusAndParams.push("▼ 固定能力値");
        data.params.forEach(p => statusAndParams.push(`・${p.label}: ${p.value}`));
    }
    if (statusAndParams.length > 0) {
        memoSections.push({ title: "能力値・ステータス", content: statusAndParams.join("\n") });
    }
    if (data.commands) {
        memoSections.push({ title: "チャットパレット", content: data.commands.trim() });
    }

    let images = [];
    if (data.iconUrl) images.push({ title: "メイン立ち絵", url: data.iconUrl, expressions: [] });

    return {
        name: charName,
        personality: "",
        memo: JSON.stringify(memoSections),
        world: "TRPG",
        group: "",
        tag: tags,
        birthday: "",
        color: charColor,
        relations: [],
        links: links,
        images: images,
        youtubeUrls: [],
        mainExpressions: []
    };
}

function parseUniversalTextSheet(text) {
    const lines = text.split(/\r?\n/);
    let name = "";
    let tags = ["テキストインポート"];
    let birthday = "";
    let personality = "";
    let images = [];
    let currentSectionTitle = "";
    let sectionContents = {};

    for (let i = 0; i < lines.length; i++) {
        const rawLine = lines[i];
        const line = rawLine.trim();
        if (!line) continue;

        if (!name) {
            if (line.startsWith("名前:")) name = line.replace("名前:", "").trim();
            else if (line.startsWith("PC名:")) name = line.replace("PC名:", "").trim();
            else if (line.startsWith("キャラクター名:")) name = line.replace("キャラクター名:", "").trim();
        }

        if (line.startsWith("タグ:")) {
            const found = line.replace("タグ:", "").trim().split(/[\s,、]+/).filter(Boolean);
            tags.push(...found);
        }
        if (line.startsWith("誕生日:")) birthday = line.replace("誕生日:", "").trim();
        if (line.startsWith("職業:")) personality = "職業: " + line.replace("職業:", "").trim();

        const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
        if (urlMatch) {
            const pUrl = urlMatch[1];
            if (pUrl.match(/\.(jpeg|jpg|gif|png|webp)/i) || pUrl.includes("image.iaproject.app")) {
                if (!images.some(img => img.url === pUrl)) images.push({ title: `立ち絵 ${images.length + 1}`, url: pUrl, expressions: [] });
            }
        }

        if (line.startsWith("【") && line.endsWith("】")) {
            currentSectionTitle = line.replace(/[【】]/g, "");
            if (!sectionContents[currentSectionTitle]) sectionContents[currentSectionTitle] = [];
            continue;
        }

        if (currentSectionTitle) {
            sectionContents[currentSectionTitle].push(rawLine);
        } else {
            if (!sectionContents["基本情報"]) sectionContents["基本情報"] = [];
            sectionContents["基本情報"].push(rawLine);
        }
    }

    let memoSections = [];
    for (const key in sectionContents) {
        const contentStr = sectionContents[key].join("\n").trim();
        if (contentStr) memoSections.push({ title: key, content: contentStr });
    }

    return {
        name: name || "テキストインポートキャラ",
        personality: personality,
        memo: JSON.stringify(memoSections),
        world: "TRPG",
        group: "",
        tag: tags,
        birthday: birthday,
        color: "#4f456e",
        relations: [],
        links: [],
        images: images,
        youtubeUrls: [],
        mainExpressions: []
    };
}

const createPageBtn = document.getElementById('create-new-page-btn');
if (createPageBtn) {
    createPageBtn.addEventListener('click', async () => {
        const user = firebase.auth().currentUser;
        if (!user) return alert(t("portal.needLoginToCreate"));
        try {
            const pageRef = db.collection("pages").doc(user.uid);
            const existing = await pageRef.get();
            if (!existing.exists) {
                await pageRef.set({
                    authorId: user.uid,
                    visibility: "public",
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
            window.location.href = `?id=${user.uid}`;
        } catch (error) {
            alert(t("portal.createPageFailed"));
        }
    });
}

function toggleFormFullscreen() {
    const form = document.getElementById('charFormPanel');
    const btn = document.getElementById('fullscreen-toggle-btn');
    if (!form || !btn) return;

    if (form.classList.contains('fullscreen-mode')) {
        form.classList.remove('fullscreen-mode');
        btn.textContent = t('char.fullscreenBtn');
    } else {
        form.classList.add('fullscreen-mode');
        btn.textContent = t('char.fullscreenClose');
        const viewport = document.getElementById("charFormTabsViewport");
        if (viewport) viewport.scrollTop = 0;
    }
}
window.toggleFormFullscreen = toggleFormFullscreen;

function openFormPanel() {
    const form = document.getElementById('charFormPanel');
    const fab = document.getElementById('form-fab');
    if (!form) return;
    updateFormEditStateUI();
    form.classList.add('open');
    const viewport = document.getElementById("charFormTabsViewport");
    if (viewport) viewport.scrollTop = 0;
    if (fab) fab.classList.add('is-open');
}

function closeFormPanel() {
    const form = document.getElementById('charFormPanel');
    const fab = document.getElementById('form-fab');
    if (!form) return;
    if (form.classList.contains('fullscreen-mode')) toggleFormFullscreen();
    form.classList.remove('open');
    if (fab) fab.classList.remove('is-open');
}

function toggleFormPanel() {
    const form = document.getElementById('charFormPanel');
    if (!form) return;
    if (form.classList.contains('open')) closeFormPanel();
    else openFormPanel();
}
window.openFormPanel = openFormPanel;
window.closeFormPanel = closeFormPanel;
window.toggleFormPanel = toggleFormPanel;

document.addEventListener('click', (e) => {
    const form = document.getElementById('charFormPanel');
    if (!form || !form.classList.contains('open')) return;
    if (form.classList.contains('fullscreen-mode')) return;
    if (!document.body.contains(e.target)) return;
    if (form.contains(e.target) || e.target.closest('#form-fab, button[onclick^="editCharacter"], .custom-modal-overlay, #characterDetailOverlay, #imageModal')) return;
    closeFormPanel();
});

document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const form = document.getElementById('charFormPanel');
    if (form && form.classList.contains('open')) closeFormPanel();
});

// =========================================
// 個人サイト風アクセスカウンター ＆ キリ番判定（Firestore完全同期）
// =========================================
let hasIncrementedVisitorCounter = false;
let latestVisitorDisplay = { total: 0, today: 0, yesterday: 0 };

async function updateVisitorCounter() {
    if (hasIncrementedVisitorCounter) {
        renderCounterStrip(latestVisitorDisplay.total, latestVisitorDisplay.today, latestVisitorDisplay.yesterday);
        return;
    }
    hasIncrementedVisitorCounter = true;

    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('id');
    const todayKey = getTodayDateKey();
    const yesterdayKey = getYesterdayDateKey();
    const scope = pageId || 'local_user';
    const storageKey = `visitor_count_${scope}`;
    const todayStorageKey = `visitor_daily_${scope}_${todayKey}`;
    const yesterdayStorageKey = `visitor_daily_${scope}_${yesterdayKey}`;

    let count = parseInt(localStorage.getItem(storageKey) || "0", 10);
    let todayCount = parseInt(localStorage.getItem(todayStorageKey) || "0", 10);
    let yesterdayCount = parseInt(localStorage.getItem(yesterdayStorageKey) || "0", 10);

    if (pageId) {
        let cloudUpdated = false;
        const pageRef = db.collection("pages").doc(pageId);
        try {
            const updatePayload = {
                visitorCount: firebase.firestore.FieldValue.increment(1)
            };
            updatePayload[`dailyVisitorStatsByDate.${todayKey}`] = firebase.firestore.FieldValue.increment(1);
            await pageRef.update(updatePayload).catch(async () => {
                await pageRef.set({
                    visitorCount: firebase.firestore.FieldValue.increment(1),
                    dailyVisitorStatsByDate: {
                        [todayKey]: firebase.firestore.FieldValue.increment(1)
                    }
                }, { merge: true });
            });
            cloudUpdated = true;
        } catch (e) {
            console.warn("Visitor counter increment error:", e);
        }

        try {
            const snap = await pageRef.get();
            if (snap.exists) {
                const data = snap.data() || {};
                const dailyStats = data.dailyVisitorStatsByDate || {};
                if (typeof data.visitorCount === "number") {
                    count = cloudUpdated ? data.visitorCount : Math.max(data.visitorCount, count) + 1;
                } else {
                    count = count + 1;
                }
                if (typeof dailyStats[todayKey] === "number") {
                    todayCount = cloudUpdated ? dailyStats[todayKey] : Math.max(dailyStats[todayKey], todayCount) + 1;
                } else {
                    todayCount = todayCount + 1;
                }
                if (typeof dailyStats[yesterdayKey] === "number") {
                    yesterdayCount = dailyStats[yesterdayKey];
                }
            } else {
                count += 1;
                todayCount += 1;
            }
        } catch (e) {
            console.warn("Visitor counter fetch error:", e);
            count += 1;
            todayCount += 1;
        }
        localStorage.setItem(storageKey, String(count));
        localStorage.setItem(todayStorageKey, String(todayCount));
        localStorage.setItem(yesterdayStorageKey, String(yesterdayCount));
    } else {
        count += 1;
        todayCount += 1;
        localStorage.setItem(storageKey, String(count));
        localStorage.setItem(todayStorageKey, String(todayCount));
    }

    renderCounterStrip(count, todayCount, yesterdayCount);
}

function renderCounterStrip(count, todayCount = 0, yesterdayCount = 0) {
    latestVisitorDisplay = {
        total: Number(count) || 0,
        today: Number(todayCount) || 0,
        yesterday: Number(yesterdayCount) || 0
    };

    const strip = document.getElementById("visitorCounterStrip");
    const badge = document.getElementById("kiribanBadge");
    const todayEl = document.getElementById("visitorTodayCount");
    const yesterdayEl = document.getElementById("visitorYesterdayCount");
    if (todayEl) todayEl.textContent = String(latestVisitorDisplay.today);
    if (yesterdayEl) yesterdayEl.textContent = String(latestVisitorDisplay.yesterday);
    if (!strip) return;

    const countStr = latestVisitorDisplay.total.toString().padStart(5, "0");
    strip.innerHTML = countStr.split("").map(digit => `<span class="counter-digit">${digit}</span>`).join("");

    const total = latestVisitorDisplay.total;
    const isKiriban = (total > 0) && (
        (total % 100 === 0) ||
        (total >= 10 && /^([0-9])\1+$/.test(total.toString())) ||
        total === 1234 || total === 777 || total === 555
    );

    if (badge) {
        if (isKiriban) {
            badge.style.display = "inline-block";
            badge.textContent = `★ ${total}人目 キリ番GET! (*'ω'*)`;
            badge.onclick = () => {
                openSendCheerModal();
                const msgArea = document.getElementById("cheerMessage");
                if (msgArea) msgArea.value = `キリ番【${total}人目】を踏みました！いつも作品楽しみに見ています (*'ω'*)`;
            };
        } else {
            badge.style.display = "none";
        }
    }
}
window.updateVisitorCounter = updateVisitorCounter;

// =========================================
// 属性十字マップ ＆ ティア表メーカー（スマホ・タッチ対応＆自作画像背景）
// =========================================
let currentBoardMode = "matrix";
const DEFAULT_MATRIX_LABELS = {
    top: "理性的 ▲",
    bottom: "本能的 ▼",
    left: "◀ 内向的",
    right: "外向的 ▶"
};

function normalizeMatrixConfig(rawMatrix) {
    const src = rawMatrix && typeof rawMatrix === "object" ? rawMatrix : {};
    const bgImage = src.bgImage || null;
    const labels = {
        ...DEFAULT_MATRIX_LABELS,
        ...(src.labels && typeof src.labels === "object" ? src.labels : {})
    };
    const q = src.quadrantColors && typeof src.quadrantColors === "object" ? src.quadrantColors : {};
    return {
        labels,
        positions: src.positions && typeof src.positions === "object" ? src.positions : {},
        bgImage,
        showAxes: typeof src.showAxes === "boolean" ? src.showAxes : !bgImage,
        globalColor: typeof src.globalColor === "string" ? src.globalColor : "",
        quadrantColors: {
            tl: typeof q.tl === "string" ? q.tl : "",
            tr: typeof q.tr === "string" ? q.tr : "",
            bl: typeof q.bl === "string" ? q.bl : "",
            br: typeof q.br === "string" ? q.br : ""
        }
    };
}

function hexToRgba(hex, alpha = 0.34) {
    if (!hex || typeof hex !== "string") return "";
    const cleaned = hex.replace("#", "").trim();
    if (cleaned.length === 3) {
        const r = parseInt(cleaned[0] + cleaned[0], 16);
        const g = parseInt(cleaned[1] + cleaned[1], 16);
        const b = parseInt(cleaned[2] + cleaned[2], 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    if (cleaned.length === 6) {
        const r = parseInt(cleaned.slice(0, 2), 16);
        const g = parseInt(cleaned.slice(2, 4), 16);
        const b = parseInt(cleaned.slice(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return hex;
}

const DEFAULT_TIER_ROW_LABELS = { S: "S", A: "A", B: "B", C: "C", D: "D" };

function createDefaultTierRecord(index = 1, seed = {}) {
    const rowLabels = {
        ...DEFAULT_TIER_ROW_LABELS,
        ...(seed.rowLabels && typeof seed.rowLabels === "object" ? seed.rowLabels : {})
    };
    return {
        id: seed.id || `tier_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        title: typeof seed.title === "string" && seed.title.trim() ? seed.title.trim() : `ティア表 ${index}`,
        isPublic: seed.isPublic !== false,
        rowLabels,
        placements: seed.placements && typeof seed.placements === "object" ? { ...seed.placements } : {}
    };
}

function normalizeTierConfig(rawTier) {
    const src = rawTier && typeof rawTier === "object" ? rawTier : {};
    let records = [];
    if (Array.isArray(src.records) && src.records.length > 0) {
        records = src.records.map((r, idx) => createDefaultTierRecord(idx + 1, r));
    } else if (src.placements && typeof src.placements === "object") {
        records = [createDefaultTierRecord(1, {
            id: "tier_default",
            title: src.title || "ティア表 1",
            isPublic: src.isPublic !== false,
            rowLabels: src.rowLabels,
            placements: src.placements
        })];
    } else {
        records = [createDefaultTierRecord(1, { id: "tier_default" })];
    }
    const activeRecordId = records.some(r => r.id === src.activeRecordId)
        ? src.activeRecordId
        : records[0].id;
    return {
        activeRecordId,
        records
    };
}

function getVisibleTierRecords() {
    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : true;
    boardConfig.tier = normalizeTierConfig(boardConfig.tier);
    const records = boardConfig.tier.records || [];
    return editable ? records : records.filter(r => r.isPublic !== false);
}

function getActiveTierRecord() {
    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : true;
    const list = getVisibleTierRecords();
    if (list.length === 0) {
        if (editable) {
            const fresh = createDefaultTierRecord(1);
            boardConfig.tier.records = [fresh];
            boardConfig.tier.activeRecordId = fresh.id;
            return fresh;
        }
        return null;
    }
    let found = list.find(r => r.id === boardConfig.tier.activeRecordId);
    if (!found) {
        found = list[0];
        boardConfig.tier.activeRecordId = found.id;
    }
    return found;
}

let boardConfig = {
    matrix: normalizeMatrixConfig(null),
    tier: normalizeTierConfig(null)
};

function loadBoardData() {
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('id') || 'local';
    const saved = localStorage.getItem(`board_data_${pageId}`);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (parsed.matrix) {
                boardConfig.matrix = normalizeMatrixConfig(parsed.matrix);
            }
            if (parsed.tier) {
                boardConfig.tier = normalizeTierConfig(parsed.tier);
            }
        } catch (e) {
            console.error("Board load failed", e);
        }
    }
    applyMatrixVisualSettings();
}

function saveBoardDataSilently() {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('id') || 'local';
    localStorage.setItem(`board_data_${pageId}`, JSON.stringify(boardConfig));
    const user = auth.currentUser;
    if (pageId !== 'local' && user && (!currentPageAuthorId || user.uid === currentPageAuthorId)) {
        db.collection("pages").doc(pageId).set({
            boardData: JSON.stringify(boardConfig)
        }, { merge: true }).catch(console.error);
    }
}

function saveBoardData() {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    saveBoardDataSilently();
    showSaveToast("ボードの配置・設定を保存しました！", "success");
}
window.saveBoardData = saveBoardData;

async function handleMatrixBgUpload(input) {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    if (!input.files || !input.files[0]) return;
    try {
        const compressed = await compressImage(input.files[0], 1000);
        boardConfig.matrix.bgImage = compressed;
        boardConfig.matrix.showAxes = false;
        applyMatrixVisualSettings();
        saveBoardDataSilently();
    } catch (e) {
        alert("画像のアップロードに失敗しました");
    }
}
window.handleMatrixBgUpload = handleMatrixBgUpload;

function clearMatrixBg() {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    boardConfig.matrix.bgImage = null;
    boardConfig.matrix.showAxes = true;
    applyMatrixVisualSettings();
    saveBoardDataSilently();
}
window.clearMatrixBg = clearMatrixBg;

function toggleMatrixAxes(checked) {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    boardConfig.matrix.showAxes = !!checked;
    applyMatrixVisualSettings();
    saveBoardDataSilently();
}
window.toggleMatrixAxes = toggleMatrixAxes;

function updateMatrixLabelFromInput(direction, value) {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    if (!boardConfig.matrix.labels) boardConfig.matrix.labels = { ...DEFAULT_MATRIX_LABELS };
    boardConfig.matrix.labels[direction] = value;
    updateMatrixLabelElements();
    saveBoardDataSilently();
}
window.updateMatrixLabelFromInput = updateMatrixLabelFromInput;

function updateMatrixGlobalColor(color) {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    boardConfig.matrix.globalColor = color || "";
    applyMatrixVisualSettings();
    saveBoardDataSilently();
}
window.updateMatrixGlobalColor = updateMatrixGlobalColor;

function updateMatrixQuadrantColor(quad, color) {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    if (!boardConfig.matrix.quadrantColors) {
        boardConfig.matrix.quadrantColors = { tl: "", tr: "", bl: "", br: "" };
    }
    boardConfig.matrix.quadrantColors[quad] = color || "";
    applyMatrixVisualSettings();
    saveBoardDataSilently();
}
window.updateMatrixQuadrantColor = updateMatrixQuadrantColor;

function resetMatrixColors() {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    boardConfig.matrix.globalColor = "";
    boardConfig.matrix.quadrantColors = { tl: "", tr: "", bl: "", br: "" };
    applyMatrixVisualSettings();
    saveBoardDataSilently();
}
window.resetMatrixColors = resetMatrixColors;

function applyMatrixVisualSettings() {
    const matrix = normalizeMatrixConfig(boardConfig.matrix);
    boardConfig.matrix = matrix;

    const container = document.getElementById("matrixContainer");
    const bgLayer = document.getElementById("matrixBgImageLayer");
    const clearBtn = document.getElementById("clearMatrixBgBtn");
    const axisX = document.getElementById("matrixAxisX");
    const axisY = document.getElementById("matrixAxisY");
    const showAxesToggle = document.getElementById("matrixShowAxesToggle");
    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : true;

    if (bgLayer) {
        if (editable && matrix.bgImage) {
            bgLayer.style.backgroundImage = `url("${matrix.bgImage}")`;
            bgLayer.style.display = "block";
            if (clearBtn) clearBtn.style.display = "inline-block";
        } else {
            bgLayer.style.backgroundImage = "none";
            bgLayer.style.display = "none";
            if (clearBtn) clearBtn.style.display = "none";
        }
    }

    if (container) {
        container.style.background = matrix.globalColor ? matrix.globalColor : "";
    }

    const quadMap = {
        tl: document.getElementById("matrixQuadTL"),
        tr: document.getElementById("matrixQuadTR"),
        bl: document.getElementById("matrixQuadBL"),
        br: document.getElementById("matrixQuadBR")
    };
    const quadColors = matrix.quadrantColors || {};
    Object.entries(quadMap).forEach(([key, el]) => {
        if (!el) return;
        const c = quadColors[key];
        el.style.backgroundColor = c ? hexToRgba(c, 0.34) : "transparent";
    });

    const showAxes = matrix.showAxes !== false;
    if (showAxesToggle) showAxesToggle.checked = showAxes;
    if (axisX) axisX.style.display = showAxes ? "block" : "none";
    if (axisY) axisY.style.display = showAxes ? "block" : "none";
    ["matrixLabelTop", "matrixLabelBottom", "matrixLabelLeft", "matrixLabelRight"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = showAxes ? "" : "none";
    });

    const globalColorInput = document.getElementById("matrixGlobalColorInput");
    if (globalColorInput && matrix.globalColor) globalColorInput.value = matrix.globalColor;
    const tlInput = document.getElementById("matrixQuadColorTL");
    const trInput = document.getElementById("matrixQuadColorTR");
    const blInput = document.getElementById("matrixQuadColorBL");
    const brInput = document.getElementById("matrixQuadColorBR");
    if (tlInput && quadColors.tl) tlInput.value = quadColors.tl;
    if (trInput && quadColors.tr) trInput.value = quadColors.tr;
    if (blInput && quadColors.bl) blInput.value = quadColors.bl;
    if (brInput && quadColors.br) brInput.value = quadColors.br;

    updateMatrixLabelElements();
}

function applyMatrixBg() {
    applyMatrixVisualSettings();
}

function selectTierRecord(recordId) {
    const list = getVisibleTierRecords();
    const target = list.find(r => r.id === recordId);
    if (!target) return;
    boardConfig.tier.activeRecordId = target.id;
    if (typeof canEditCurrentPage === "function" && canEditCurrentPage()) {
        saveBoardDataSilently();
    }
    renderBoard();
}
window.selectTierRecord = selectTierRecord;

function createNewTierRecord() {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    boardConfig.tier = normalizeTierConfig(boardConfig.tier);
    const nextNum = boardConfig.tier.records.length + 1;
    const newRec = createDefaultTierRecord(nextNum, {
        title: `ティア表 ${nextNum}`,
        isPublic: true,
        placements: {}
    });
    boardConfig.tier.records.push(newRec);
    boardConfig.tier.activeRecordId = newRec.id;
    saveBoardDataSilently();
    renderBoard();
    const inp = document.getElementById("tierTitleInput");
    if (inp) inp.focus();
}
window.createNewTierRecord = createNewTierRecord;

function deleteTierRecord(recordId, evt) {
    if (evt) evt.stopPropagation();
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    if (!confirm("このティア表を削除しますか？")) return;
    boardConfig.tier = normalizeTierConfig(boardConfig.tier);
    const idx = boardConfig.tier.records.findIndex(r => r.id === recordId);
    if (idx === -1) return;
    boardConfig.tier.records.splice(idx, 1);
    if (boardConfig.tier.records.length === 0) {
        boardConfig.tier.records.push(createDefaultTierRecord(1));
    }
    if (!boardConfig.tier.records.some(r => r.id === boardConfig.tier.activeRecordId)) {
        boardConfig.tier.activeRecordId = boardConfig.tier.records[0].id;
    }
    saveBoardDataSilently();
    renderBoard();
}
window.deleteTierRecord = deleteTierRecord;

function updateActiveTierTitle(titleVal) {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    const active = getActiveTierRecord();
    if (!active) return;
    active.title = titleVal;
    saveBoardDataSilently();
    renderTierRecords();
}
window.updateActiveTierTitle = updateActiveTierTitle;

function toggleTierRecordVisibility(checked) {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    const active = getActiveTierRecord();
    if (!active) return;
    active.isPublic = !!checked;
    saveBoardDataSilently();
    renderTierRecords();
}
window.toggleTierRecordVisibility = toggleTierRecordVisibility;

function renderTierRecords() {
    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : true;
    const isTierMode = !editable || currentBoardMode === "tier";

    const card = document.getElementById("tierRecordsCard");
    const listEl = document.getElementById("tierRecordsList");
    const newBtn = document.getElementById("newTierRecordBtn");
    const editorMeta = document.getElementById("tierEditorMetaBar");
    const titleInput = document.getElementById("tierTitleInput");
    const visCheckbox = document.getElementById("tierRecordPublicCheckbox");
    const activeTitleBar = document.getElementById("tierActiveTitleBar");
    const privateNotice = document.getElementById("tierPrivateNotice");
    const containerTier = document.getElementById("tierContainer");
    const exportBtn = document.getElementById("exportBoardImageBtn");

    if (!isTierMode) {
        if (card) card.style.display = "none";
        if (editorMeta) editorMeta.style.display = "none";
        if (activeTitleBar) activeTitleBar.style.display = "none";
        if (privateNotice) privateNotice.style.display = "none";
        if (exportBtn) exportBtn.style.display = "";
        return;
    }

    const visibleRecords = getVisibleTierRecords();
    const active = getActiveTierRecord();

    if (card) card.style.display = (editable || visibleRecords.length > 1) ? "" : "none";
    if (newBtn) newBtn.style.display = editable ? "" : "none";
    if (editorMeta) editorMeta.style.display = editable ? "flex" : "none";

    if (!editable && !active) {
        if (privateNotice) privateNotice.style.display = "block";
        if (containerTier) containerTier.style.display = "none";
        if (activeTitleBar) activeTitleBar.style.display = "none";
        if (exportBtn) exportBtn.style.display = "none";
    } else {
        if (privateNotice) privateNotice.style.display = "none";
        if (containerTier) containerTier.style.display = "flex";
        if (exportBtn) exportBtn.style.display = "";
    }

    if (active) {
        if (titleInput && document.activeElement !== titleInput) {
            titleInput.value = active.title || "";
        }
        if (visCheckbox) visCheckbox.checked = active.isPublic !== false;
        const placementsCount = Object.keys(active.placements || {}).length;
        if (activeTitleBar) {
            activeTitleBar.style.display = "flex";
            activeTitleBar.innerHTML = `<span>${escapeHTML((active.title || "").trim() || "無題のティア表")}</span><span style="font-size:12px; color:var(--text-muted);">${placementsCount}人配置中</span>`;
        }
        const rowLabels = active.rowLabels || DEFAULT_TIER_ROW_LABELS;
        Object.keys(DEFAULT_TIER_ROW_LABELS).forEach(k => {
            const lblEl = document.querySelector(`.tier-row[data-tier="${k}"] .tier-row-label`);
            if (lblEl) lblEl.textContent = rowLabels[k] || k;
        });
    }

    if (listEl) {
        if (visibleRecords.length === 0) {
            listEl.innerHTML = `<span style="font-size:12px; color:var(--text-muted);">公開されているティア表はありません。</span>`;
        } else {
            listEl.innerHTML = visibleRecords.map(rec => {
                const isActive = active && rec.id === active.id;
                const count = Object.keys(rec.placements || {}).length;
                const label = (rec.title || "").trim() || "無題のティア表";
                return `
                    <div class="dialogue-record-chip ${isActive ? 'active' : ''}" onclick="selectTierRecord('${rec.id}')">
                        <span>${escapeHTML(label)}</span>
                        <span class="dialogue-record-meta">(${count})</span>
                        ${(editable && rec.isPublic === false) ? `<span class="dialogue-record-priv-tag">非公開</span>` : ""}
                        ${editable ? `<button type="button" class="dialogue-record-del-btn" onclick="deleteTierRecord('${rec.id}', event)" title="このティア表を削除">✕</button>` : ""}
                    </div>
                `;
            }).join("");
        }
    }
}

function applyBoardRoleUI() {
    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : true;
    if (!editable) {
        currentBoardMode = "tier";
    }

    const tabMatrix = document.getElementById("tabBtnMatrix");
    const tabTier = document.getElementById("tabBtnTier");
    const containerMatrix = document.getElementById("matrixContainer");
    const containerTier = document.getElementById("tierContainer");
    const customizePanel = document.getElementById("matrixCustomizePanel");
    const bgUploadLabel = document.getElementById("matrixBgUploadLabel");
    const clearBgBtn = document.getElementById("clearMatrixBgBtn");
    const resetBtn = document.getElementById("resetBoardBtn");
    const saveBtn = document.getElementById("saveBoardBtn");
    const dockContainer = document.getElementById("boardCharDockContainer");
    const titleEl = document.getElementById("boardPageTitle");
    const descEl = document.getElementById("boardPageDesc");

    if (!editable) {
        if (titleEl) titleEl.textContent = "ティア表";
        if (descEl) descEl.textContent = "作者が設定したキャラクターのティア表（閲覧専用）です。";
        if (tabMatrix) tabMatrix.style.display = "none";
        if (tabTier) {
            tabTier.style.display = "none";
            tabTier.classList.add("active");
        }
        if (customizePanel) customizePanel.style.display = "none";
        if (containerMatrix) containerMatrix.style.display = "none";
        if (containerTier) containerTier.style.display = "flex";
        if (bgUploadLabel) bgUploadLabel.style.display = "none";
        if (clearBgBtn) clearBgBtn.style.display = "none";
        if (resetBtn) resetBtn.style.display = "none";
        if (saveBtn) saveBtn.style.display = "none";
        if (dockContainer) dockContainer.style.display = "none";
    } else {
        if (titleEl) titleEl.textContent = "属性十字マップ ＆ ティア表メーカー";
        if (descEl) descEl.textContent = "キャラクターの立ち位置・性格2軸・関係性やランクを自由に配置して楽しめます。";
        if (tabMatrix) tabMatrix.style.display = "";
        if (tabTier) tabTier.style.display = "";
        if (resetBtn) resetBtn.style.display = "";
        if (saveBtn) saveBtn.style.display = "";
        if (dockContainer) dockContainer.style.display = "";

        if (currentBoardMode === "matrix") {
            if (tabMatrix) tabMatrix.classList.add("active");
            if (tabTier) tabTier.classList.remove("active");
            if (customizePanel) customizePanel.style.display = "flex";
            if (bgUploadLabel) bgUploadLabel.style.display = "inline-flex";
            if (containerMatrix) containerMatrix.style.display = "block";
            if (containerTier) containerTier.style.display = "none";
        } else {
            if (tabMatrix) tabMatrix.classList.remove("active");
            if (tabTier) tabTier.classList.add("active");
            if (customizePanel) customizePanel.style.display = "none";
            if (bgUploadLabel) bgUploadLabel.style.display = "none";
            if (clearBgBtn) clearBgBtn.style.display = "none";
            if (containerMatrix) containerMatrix.style.display = "none";
            if (containerTier) containerTier.style.display = "flex";
        }
        applyMatrixVisualSettings();
    }
    renderTierRecords();
}
window.applyBoardRoleUI = applyBoardRoleUI;

function switchBoardMode(mode) {
    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : true;
    currentBoardMode = (!editable && mode === "matrix") ? "tier" : mode;
    applyBoardRoleUI();
    renderBoard();
}
window.switchBoardMode = switchBoardMode;

function editMatrixLabel(direction) {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    const current = boardConfig.matrix.labels[direction] || "";
    const updated = prompt("新しい軸ラベルを入力してください：", current);
    if (updated !== null) {
        boardConfig.matrix.labels[direction] = updated.trim();
        updateMatrixLabelElements();
        saveBoardDataSilently();
    }
}
window.editMatrixLabel = editMatrixLabel;

function updateMatrixLabelElements() {
    const labels = boardConfig.matrix.labels || DEFAULT_MATRIX_LABELS;
    const lblTop = document.getElementById("matrixLabelTop");
    const lblBottom = document.getElementById("matrixLabelBottom");
    const lblLeft = document.getElementById("matrixLabelLeft");
    const lblRight = document.getElementById("matrixLabelRight");

    if (lblTop) lblTop.textContent = labels.top || "";
    if (lblBottom) lblBottom.textContent = labels.bottom || "";
    if (lblLeft) lblLeft.textContent = labels.left || "";
    if (lblRight) lblRight.textContent = labels.right || "";

    const inpTop = document.getElementById("matrixLabelInputTop");
    const inpBottom = document.getElementById("matrixLabelInputBottom");
    const inpLeft = document.getElementById("matrixLabelInputLeft");
    const inpRight = document.getElementById("matrixLabelInputRight");

    if (inpTop && document.activeElement !== inpTop) inpTop.value = labels.top || "";
    if (inpBottom && document.activeElement !== inpBottom) inpBottom.value = labels.bottom || "";
    if (inpLeft && document.activeElement !== inpLeft) inpLeft.value = labels.left || "";
    if (inpRight && document.activeElement !== inpRight) inpRight.value = labels.right || "";
}

function editTierRowLabel(el) {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    const rowEl = el.closest(".tier-row");
    const tierKey = rowEl ? rowEl.dataset.tier : "";
    const current = el.textContent.trim();
    const updated = prompt("ランク・グループ名を入力：", current);
    if (updated !== null && updated.trim()) {
        const clean = updated.trim();
        el.textContent = clean;
        const activeTier = getActiveTierRecord();
        if (activeTier && tierKey) {
            if (!activeTier.rowLabels) activeTier.rowLabels = { ...DEFAULT_TIER_ROW_LABELS };
            activeTier.rowLabels[tierKey] = clean;
            saveBoardDataSilently();
        }
    }
}
window.editTierRowLabel = editTierRowLabel;

function resetBoardTokens() {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    if (!confirm("現在の配置をすべてリセットしますか？")) return;
    if (currentBoardMode === "matrix") {
        boardConfig.matrix.positions = {};
    } else {
        const activeTier = getActiveTierRecord();
        if (activeTier) activeTier.placements = {};
    }
    saveBoardDataSilently();
    renderBoard();
}
window.resetBoardTokens = resetBoardTokens;

function renderBoard() {
    loadBoardData();
    applyBoardRoleUI();
    updateMatrixLabelElements();

    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : true;
    const dock = document.getElementById("boardCharDock");
    const matrixArea = document.getElementById("matrixPlacedArea");
    if (!dock || !matrixArea) return;

    matrixArea.innerHTML = "";
    dock.innerHTML = "";
    document.querySelectorAll(".tier-row-items").forEach(el => el.innerHTML = "");

    const activeChars = getVisibleCharacters();
    const activeTier = getActiveTierRecord();
    const tierPlacements = activeTier ? (activeTier.placements || {}) : {};

    activeChars.forEach(c => {
        const charId = String(c.id);
        const charColor = c.color || "#5865f2";

        const token = document.createElement("div");
        token.className = "char-token";
        token.dataset.charId = charId;
        token.title = `${c.name} (${c.world || '未設定'})`;
        token.style.borderColor = charColor;
        token.style.cursor = editable ? "grab" : "default";
        applyCharAvatarBgToElement(token, c);
        token.innerHTML = `<span class="char-token-name">${escapeHTML(c.name)}</span>`;

        if (editable) {
            attachPointerDragToToken(token, charId);
        }

        if (editable && currentBoardMode === "matrix") {
            const pos = boardConfig.matrix.positions[charId];
            if (pos) {
                token.classList.add("matrix-token");
                token.style.left = `${pos.x}%`;
                token.style.top = `${pos.y}%`;
                matrixArea.appendChild(token);
            } else {
                dock.appendChild(token);
            }
        } else if (activeTier) {
            const tier = tierPlacements[charId];
            if (tier) {
                const tierRow = document.querySelector(`.tier-row[data-tier="${tier}"] .tier-row-items`);
                if (tierRow) {
                    tierRow.appendChild(token);
                } else if (editable) {
                    dock.appendChild(token);
                }
            } else if (editable) {
                dock.appendChild(token);
            }
        }
    });

    if (editable) setupMatrixDropArea();
}

function attachPointerDragToToken(token, charId) {
    let isDragging = false;
    let startX = 0, startY = 0;
    let hasMoved = false;
    let ghost = null;

    const cleanupGhost = () => {
        if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
        ghost = null;
        token.style.opacity = "";
    };

    token.onpointerdown = (e) => {
        if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
        if (e.button && e.button !== 0) return;
        e.preventDefault();
        isDragging = true;
        hasMoved = false;
        startX = e.clientX;
        startY = e.clientY;
        try { token.setPointerCapture(e.pointerId); } catch (_) {}
    };

    token.onpointermove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const dist = Math.hypot(e.clientX - startX, e.clientY - startY);
        if (dist > 4) hasMoved = true;
        if (!hasMoved) return;

        if (!ghost) {
            ghost = token.cloneNode(true);
            ghost.classList.remove("matrix-token");
            ghost.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                transform: translate(-50%, -50%);
                z-index: 99999;
                pointer-events: none;
                margin: 0;
                box-shadow: 0 8px 24px rgba(0,0,0,0.3);
            `;
            if (token.style.backgroundImage) ghost.style.backgroundImage = token.style.backgroundImage;
            if (token.style.borderColor) ghost.style.borderColor = token.style.borderColor;
            document.body.appendChild(ghost);
            token.style.opacity = "0.35";
        } else {
            ghost.style.left = `${e.clientX}px`;
            ghost.style.top = `${e.clientY}px`;
        }
    };

    const finishDrag = (e) => {
        if (!isDragging) return;
        isDragging = false;
        try { token.releasePointerCapture(e.pointerId); } catch (_) {}
        cleanupGhost();

        if (!hasMoved) return;
        if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;

        if (currentBoardMode === "matrix") {
            const matrix = document.getElementById("matrixContainer");
            const dock = document.getElementById("boardCharDock");
            if (matrix) {
                const rect = matrix.getBoundingClientRect();
                const inMatrix = (e.clientX >= rect.left && e.clientX <= rect.right &&
                                  e.clientY >= rect.top && e.clientY <= rect.bottom);
                if (inMatrix) {
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    boardConfig.matrix.positions[charId] = {
                        x: Math.round(Math.max(4, Math.min(96, x))),
                        y: Math.round(Math.max(4, Math.min(96, y)))
                    };
                } else if (dock) {
                    const dockRect = dock.getBoundingClientRect();
                    if (e.clientX >= dockRect.left && e.clientX <= dockRect.right &&
                        e.clientY >= dockRect.top && e.clientY <= dockRect.bottom) {
                        delete boardConfig.matrix.positions[charId];
                    }
                }
            }
        } else {
            const tierRows = document.querySelectorAll(".tier-row");
            let placedTier = null;
            tierRows.forEach(row => {
                const rect = row.getBoundingClientRect();
                if (e.clientX >= rect.left && e.clientX <= rect.right &&
                    e.clientY >= rect.top && e.clientY <= rect.bottom) {
                    placedTier = row.dataset.tier;
                }
            });
            if (placedTier) {
                const activeTier = getActiveTierRecord();
                if (activeTier) activeTier.placements[charId] = placedTier;
            } else {
                const dock = document.getElementById("boardCharDock");
                if (dock) {
                    const dockRect = dock.getBoundingClientRect();
                    if (e.clientX >= dockRect.left && e.clientX <= dockRect.right &&
                        e.clientY >= dockRect.top && e.clientY <= dockRect.bottom) {
                        const activeTier = getActiveTierRecord();
                        if (activeTier) delete activeTier.placements[charId];
                    }
                }
            }
        }
        saveBoardDataSilently();
        renderBoard();
    };

    token.onpointerup = finishDrag;
    token.onpointercancel = finishDrag;
}

function setupMatrixDropArea() {
    const matrix = document.getElementById("matrixContainer");
    if (!matrix) return;

    matrix.ondragover = (e) => { e.preventDefault(); };
    matrix.ondrop = (e) => {
        e.preventDefault();
        if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
        const charId = e.dataTransfer.getData("text/plain");
        if (!charId) return;

        const rect = matrix.getBoundingClientRect();
        let x = ((e.clientX - rect.left) / rect.width) * 100;
        let y = ((e.clientY - rect.top) / rect.height) * 100;
        x = Math.max(5, Math.min(95, x));
        y = Math.max(5, Math.min(95, y));

        boardConfig.matrix.positions[charId] = { x: Math.round(x), y: Math.round(y) };
        saveBoardDataSilently();
        renderBoard();
    };
}

function allowTierDrop(e) { e.preventDefault(); }
window.allowTierDrop = allowTierDrop;

function handleTierDrop(e, tier) {
    e.preventDefault();
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    const charId = e.dataTransfer.getData("text/plain");
    if (!charId) return;
    const activeTier = getActiveTierRecord();
    if (activeTier) activeTier.placements[charId] = tier;
    saveBoardDataSilently();
    renderBoard();
}
window.handleTierDrop = handleTierDrop;

function handleDockDrop(e) {
    e.preventDefault();
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    const charId = e.dataTransfer.getData("text/plain");
    if (!charId) return;

    if (currentBoardMode === "matrix") {
        delete boardConfig.matrix.positions[charId];
    } else {
        const activeTier = getActiveTierRecord();
        if (activeTier) delete activeTier.placements[charId];
    }
    saveBoardDataSilently();
    renderBoard();
}
window.handleDockDrop = handleDockDrop;

function loadCanvasImageSafe(src) {
    return new Promise((resolve) => {
        if (!src) return resolve(null);
        const img = new Image();
        if (!src.startsWith("data:")) img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
    });
}

function drawRoundedRectPath(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
}

async function drawCanvasCharToken(ctx, charObj, imgObj, cx, cy, radius) {
    const borderColor = charObj.color || "#5865f2";
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = borderColor;
    ctx.fill();
    ctx.clip();

    if (imgObj) {
        const usePos = !charObj.iconUrl && charObj.images && charObj.images[0];
        const pos = usePos ? (charObj.imagePosition || "center") : "center";
        const d = radius * 2;
        if (pos === "contain") {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(cx - radius, cy - radius, d, d);
            const scale = Math.min(d / Math.max(1, imgObj.width), d / Math.max(1, imgObj.height));
            const dw = imgObj.width * scale;
            const dh = imgObj.height * scale;
            ctx.drawImage(imgObj, cx - dw / 2, cy - dh / 2, dw, dh);
        } else {
            const aspect = imgObj.width / Math.max(1, imgObj.height);
            let drawW = d;
            let drawH = d;
            let dx = cx - radius;
            let dy = cy - radius;
            if (aspect > 1) {
                drawW = drawH * aspect;
                dx = cx - drawW / 2;
            } else {
                drawH = drawW / aspect;
                if (pos === "top") {
                    dy = cy - radius;
                } else if (pos === "bottom") {
                    dy = cy + radius - drawH;
                } else {
                    dy = cy - drawH / 2;
                }
            }
            ctx.drawImage(imgObj, dx, dy, drawW, drawH);
        }
    } else {
        ctx.fillStyle = borderColor;
        ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${Math.round(radius * 0.85)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText((charObj.name || "?").slice(0, 1), cx, cy);
    }
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = borderColor;
    ctx.stroke();
    ctx.restore();

    const label = charObj.name || "";
    if (label) {
        ctx.save();
        ctx.font = "bold 15px sans-serif";
        const padX = 10;
        const textW = Math.min(140, ctx.measureText(label).width);
        const boxW = textW + padX * 2;
        const boxH = 24;
        const bx = cx - boxW / 2;
        const by = cy + radius - 6;
        drawRoundedRectPath(ctx, bx, by, boxW, boxH, 8);
        ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label.slice(0, 10), cx, by + boxH / 2);
        ctx.restore();
    }
}

async function exportBoardAsImage() {
    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : true;
    const mode = editable ? currentBoardMode : "tier";
    const activeChars = getVisibleCharacters();
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const bgColor = isDark ? "#0f172a" : "#ffffff";
    const borderColor = isDark ? "#334155" : "#cbd5e1";
    const textColor = isDark ? "#f8fafc" : "#1e293b";

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const dateTag = getTodayDateKey().replace(/-/g, "");

    if (mode === "matrix") {
        const W = 1200;
        const H = 1200;
        canvas.width = W;
        canvas.height = H;

        const matrix = normalizeMatrixConfig(boardConfig.matrix);
        ctx.fillStyle = matrix.globalColor || bgColor;
        ctx.fillRect(0, 0, W, H);

        const qColors = matrix.quadrantColors || {};
        const drawQuad = (c, qx, qy) => {
            if (!c) return;
            ctx.fillStyle = hexToRgba(c, 0.34);
            ctx.fillRect(qx, qy, W / 2, H / 2);
        };
        drawQuad(qColors.tl, 0, 0);
        drawQuad(qColors.tr, W / 2, 0);
        drawQuad(qColors.bl, 0, H / 2);
        drawQuad(qColors.br, W / 2, H / 2);

        if (matrix.bgImage) {
            const bgImg = await loadCanvasImageSafe(matrix.bgImage);
            if (bgImg) {
                const scale = Math.min(W / bgImg.width, H / bgImg.height);
                const dw = bgImg.width * scale;
                const dh = bgImg.height * scale;
                ctx.save();
                ctx.globalAlpha = 0.92;
                ctx.drawImage(bgImg, (W - dw) / 2, (H - dh) / 2, dw, dh);
                ctx.restore();
            }
        }

        if (matrix.showAxes !== false) {
            ctx.save();
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = 3;
            ctx.setLineDash([12, 10]);
            ctx.beginPath();
            ctx.moveTo(W / 2, 48);
            ctx.lineTo(W / 2, H - 48);
            ctx.moveTo(48, H / 2);
            ctx.lineTo(W - 48, H / 2);
            ctx.stroke();
            ctx.restore();

            const labels = matrix.labels || {};
            const drawAxisPill = (text, x, y, align) => {
                if (!text) return;
                ctx.save();
                ctx.font = "bold 22px sans-serif";
                const tw = ctx.measureText(text).width;
                const bw = tw + 28;
                const bh = 40;
                let bx = x - bw / 2;
                if (align === "left") bx = x;
                if (align === "right") bx = x - bw;
                const by = y - bh / 2;
                drawRoundedRectPath(ctx, bx, by, bw, bh, 12);
                ctx.fillStyle = isDark ? "rgba(30,41,59,0.92)" : "rgba(255,255,255,0.92)";
                ctx.fill();
                ctx.strokeStyle = borderColor;
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.fillStyle = textColor;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(text, bx + bw / 2, y);
                ctx.restore();
            };

            drawAxisPill(labels.top, W / 2, 36, "center");
            drawAxisPill(labels.bottom, W / 2, H - 36, "center");
            drawAxisPill(labels.left, 24, H / 2, "left");
            drawAxisPill(labels.right, W - 24, H / 2, "right");
        }

        const placed = activeChars.filter(c => matrix.positions[String(c.id)]);
        const imgs = await Promise.all(placed.map(c => loadCanvasImageSafe(c.iconUrl || (c.images && c.images[0]?.url))));
        for (let i = 0; i < placed.length; i++) {
            const c = placed[i];
            const pos = matrix.positions[String(c.id)];
            const px = (pos.x / 100) * W;
            const py = (pos.y / 100) * H;
            await drawCanvasCharToken(ctx, c, imgs[i], px, py, 44);
        }
    } else {
        const activeTier = getActiveTierRecord();
        if (!activeTier) return alert("表示できるティア表がありません。");
        const tierPlacements = activeTier.placements || {};
        const tierRowLabels = activeTier.rowLabels || DEFAULT_TIER_ROW_LABELS;
        const tierTitle = (activeTier.title || "").trim() || "キャラクター ティア表";

        const tierDefs = [
            { key: "S", color: "#ef4444" },
            { key: "A", color: "#f97316" },
            { key: "B", color: "#eab308" },
            { key: "C", color: "#10b981" },
            { key: "D", color: "#6366f1" }
        ];
        const W = 1200;
        const labelColW = 130;
        const padding = 24;
        const cellSize = 112;
        const rowInnerW = W - padding * 2 - labelColW - 24;
        const colsPerRow = Math.max(1, Math.floor(rowInnerW / cellSize));

        const rowInfos = tierDefs.map(def => {
            const label = tierRowLabels[def.key] || def.key;
            const charsInTier = activeChars.filter(c => tierPlacements[String(c.id)] === def.key);
            const numLines = Math.max(1, Math.ceil(charsInTier.length / colsPerRow));
            const height = Math.max(128, numLines * 114 + 24);
            return { ...def, label, chars: charsInTier, height };
        });

        const headerH = 74;
        const totalH = headerH + rowInfos.reduce((acc, r) => acc + r.height + 12, 0) + padding;
        canvas.width = W;
        canvas.height = totalH;

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, W, totalH);

        ctx.fillStyle = textColor;
        ctx.font = "bold 28px sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(tierTitle, padding, 40);

        let curY = headerH;
        for (const row of rowInfos) {
            drawRoundedRectPath(ctx, padding, curY, W - padding * 2, row.height, 14);
            ctx.fillStyle = isDark ? "#1e293b" : "#f8fafc";
            ctx.fill();
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.save();
            drawRoundedRectPath(ctx, padding, curY, labelColW, row.height, 14);
            ctx.fillStyle = row.color;
            ctx.fill();
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 32px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(row.label.slice(0, 6), padding + labelColW / 2, curY + row.height / 2);
            ctx.restore();

            const imgs = await Promise.all(row.chars.map(c => loadCanvasImageSafe(c.iconUrl || (c.images && c.images[0]?.url))));
            for (let i = 0; i < row.chars.length; i++) {
                const colIdx = i % colsPerRow;
                const lineIdx = Math.floor(i / colsPerRow);
                const cx = padding + labelColW + 24 + colIdx * cellSize + cellSize / 2;
                const cy = curY + 18 + lineIdx * 114 + 42;
                await drawCanvasCharToken(ctx, row.chars[i], imgs[i], cx, cy, 38);
            }

            curY += row.height + 12;
        }
    }

    const filename = mode === "matrix" ? `cross-matrix_${dateTag}.png` : `tier-list_${dateTag}.png`;
    if (canvas.toBlob) {
        canvas.toBlob((blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }, "image/png");
    } else {
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
}
window.exportBoardAsImage = exportBoardAsImage;

// =========================================
// キャラクター相関図（関係性ネットワークマップ）
// =========================================
let relMapPositions = {};
let selectedRelCharId = null;

function saveRelMapPositionsSilently() {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('id') || 'local';
    localStorage.setItem(`rel_map_positions_${pageId}`, JSON.stringify(relMapPositions));
    const user = auth.currentUser;
    if (pageId !== 'local' && user && (!currentPageAuthorId || user.uid === currentPageAuthorId)) {
        db.collection("pages").doc(pageId).set({
            relMapData: JSON.stringify(relMapPositions)
        }, { merge: true }).catch(console.error);
    }
}

function getRelNodePixelPos(id, width, height, idx = 0, total = 1) {
    const pad = Math.min(40, Math.round(Math.min(width, height) * 0.12));
    const saved = relMapPositions[id];
    let px = null;
    let py = null;
    if (saved) {
        if (typeof saved.px === "number" && typeof saved.py === "number") {
            px = saved.px;
            py = saved.py;
        } else if (typeof saved.x === "number" && typeof saved.y === "number") {
            px = Math.max(8, Math.min(92, (saved.x / 800) * 100));
            py = Math.max(10, Math.min(90, (saved.y / 600) * 100));
            relMapPositions[id] = { px, py, unit: "pct" };
        }
    }
    if (px === null || py === null) {
        const angle = (idx / Math.max(1, total)) * 2 * Math.PI - Math.PI / 2;
        const rx = 34;
        const ry = 34;
        px = 50 + rx * Math.cos(angle);
        py = 50 + ry * Math.sin(angle);
        relMapPositions[id] = { px, py, unit: "pct" };
    }
    const rawX = (px / 100) * width;
    const rawY = (py / 100) * height;
    return {
        x: Math.max(pad, Math.min(width - pad, rawX)),
        y: Math.max(pad, Math.min(height - pad, rawY))
    };
}

function renderRelationshipMap() {
    const container = document.getElementById("relMapCanvasContainer");
    const svg = document.getElementById("relMapSvg");
    const nodesArea = document.getElementById("relMapNodesArea");
    const worldFilter = document.getElementById("relMapWorldFilter");
    const hintText = document.getElementById("relMapHintText");
    if (!container || !svg || !nodesArea) return;

    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : true;
    if (hintText) {
        hintText.textContent = editable
            ? "キャラアイコンをドラッグして自由にレイアウトを整理できます。ノードをクリックすると関係相手が強調されます。"
            : "ノードをクリックすると関係相手が強調されます。（閲覧専用）";
    }

    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('id') || 'local';
    if (Object.keys(relMapPositions).length === 0) {
        try {
            const cached = localStorage.getItem(`rel_map_positions_${pageId}`);
            if (cached) relMapPositions = JSON.parse(cached) || {};
        } catch (_) {}
    }

    const activeChars = getVisibleCharacters();
    if (worldFilter) {
        const currentVal = worldFilter.value;
        const worlds = [...new Set(activeChars.map(c => c.world).filter(Boolean))];
        worldFilter.innerHTML = '<option value="">すべての世界線</option>' +
            worlds.map(w => `<option value="${escapeHTML(w)}">${escapeHTML(w)}</option>`).join("");
        worldFilter.value = currentVal;
    }

    const selectedWorld = worldFilter ? worldFilter.value : "";
    const filteredChars = selectedWorld
        ? activeChars.filter(c => c.world === selectedWorld)
        : activeChars;

    nodesArea.innerHTML = "";
    svg.innerHTML = "";

    if (filteredChars.length === 0) {
        nodesArea.innerHTML = `<div style="text-align:center; padding:60px 20px; color:var(--text-muted); font-size:14px;">表示できるキャラクターがまだいません。</div>`;
        return;
    }

    const rect = container.getBoundingClientRect();
    const width = rect.width || container.clientWidth || 340;
    const height = rect.height || container.clientHeight || 440;
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    const pixelPositions = {};
    filteredChars.forEach((c, idx) => {
        const id = String(c.id);
        pixelPositions[id] = getRelNodePixelPos(id, width, height, idx, filteredChars.length);
    });

    filteredChars.forEach(c => {
        const id = String(c.id);
        const pos = pixelPositions[id];

        const node = document.createElement("div");
        node.className = `rel-node ${selectedRelCharId === id ? 'highlighted' : ''}`;
        node.dataset.charId = id;
        node.style.left = `${pos.x}px`;
        node.style.top = `${pos.y}px`;
        node.style.borderColor = c.color || "var(--primary)";
        node.style.cursor = editable ? "grab" : "pointer";
        applyCharAvatarBgToElement(node, c);
        node.innerHTML = `<span class="rel-node-name">${escapeHTML(c.name)}</span>`;

        if (editable) {
            attachPointerDragToRelNode(node, id, width, height, pixelPositions);
        }

        node.onclick = (e) => {
            e.stopPropagation();
            if (node.dataset.justDragged === "true") {
                delete node.dataset.justDragged;
                return;
            }
            selectedRelCharId = (selectedRelCharId === id) ? null : id;
            renderRelationshipMap();
        };

        nodesArea.appendChild(node);
    });

    drawRelMapLines(filteredChars, svg, pixelPositions, width, height);
}
window.renderRelationshipMap = renderRelationshipMap;

function attachPointerDragToRelNode(node, charId, initWidth, initHeight, pixelPositions) {
    let isDragging = false;
    let hasMoved = false;
    let startX = 0, startY = 0;
    let nodeStartX = 0, nodeStartY = 0;

    node.onpointerdown = (e) => {
        if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
        if (e.button && e.button !== 0) return;
        e.preventDefault();
        isDragging = true;
        hasMoved = false;
        startX = e.clientX;
        startY = e.clientY;
        const container = document.getElementById("relMapCanvasContainer");
        const w = container ? container.clientWidth : initWidth;
        const h = container ? container.clientHeight : initHeight;
        const current = getRelNodePixelPos(charId, w, h);
        nodeStartX = current.x;
        nodeStartY = current.y;
        try { node.setPointerCapture(e.pointerId); } catch (_) {}
    };

    node.onpointermove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.hypot(dx, dy) > 4) hasMoved = true;

        const container = document.getElementById("relMapCanvasContainer");
        const w = container ? container.clientWidth : initWidth;
        const h = container ? container.clientHeight : initHeight;
        const pad = Math.min(40, Math.round(Math.min(w, h) * 0.12));

        const newX = Math.max(pad, Math.min(w - pad, nodeStartX + dx));
        const newY = Math.max(pad, Math.min(h - pad, nodeStartY + dy));
        relMapPositions[charId] = {
            px: (newX / Math.max(1, w)) * 100,
            py: (newY / Math.max(1, h)) * 100,
            unit: "pct"
        };
        if (pixelPositions) pixelPositions[charId] = { x: newX, y: newY };
        node.style.left = `${newX}px`;
        node.style.top = `${newY}px`;

        const selectedWorld = document.getElementById("relMapWorldFilter")?.value || "";
        const activeChars = getVisibleCharacters().filter(c => !selectedWorld || c.world === selectedWorld);
        const svg = document.getElementById("relMapSvg");
        if (svg) drawRelMapLines(activeChars, svg, pixelPositions, w, h);
    };

    const endDrag = (e) => {
        if (!isDragging) return;
        isDragging = false;
        if (hasMoved) {
            node.dataset.justDragged = "true";
            saveRelMapPositionsSilently();
        }
        try { node.releasePointerCapture(e.pointerId); } catch (_) {}
    };
    node.onpointerup = endDrag;
    node.onpointercancel = endDrag;
}

function drawRelMapLines(chars, svg, pixelPositions, width = 800, height = 600) {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const pillBg = isDark ? "rgba(15, 23, 42, 0.92)" : "rgba(255, 255, 255, 0.94)";
    const nodeRadius = width <= 600 ? 28 : 36;
    const curveBase = width <= 600 ? 28 : 36;

    const visibleIds = new Set(chars.map(c => String(c.id)));
    const edges = [];
    chars.forEach(c => {
        const fromId = String(c.id);
        if (!Array.isArray(c.relations)) return;
        c.relations.forEach(r => {
            const toId = String(r.targetId);
            if (!visibleIds.has(toId) || fromId === toId) return;
            edges.push({ fromId, toId, title: r.title || "関係" });
        });
    });

    const pairCounts = {};
    edges.forEach(e => {
        const key = `${e.fromId}->${e.toId}`;
        pairCounts[key] = (pairCounts[key] || 0) + 1;
    });

    let svgContent = `
        <defs>
            <marker id="relArrowNormal" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#64748b" />
            </marker>
            <marker id="relArrowActive" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#f59e0b" />
            </marker>
        </defs>
    `;

    const seenDirCount = {};
    edges.forEach(edge => {
        const fromPos = (pixelPositions && pixelPositions[edge.fromId]) || getRelNodePixelPos(edge.fromId, width, height);
        const toPos = (pixelPositions && pixelPositions[edge.toId]) || getRelNodePixelPos(edge.toId, width, height);
        const dx = toPos.x - fromPos.x;
        const dy = toPos.y - fromPos.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 10) return;

        const dirKey = `${edge.fromId}->${edge.toId}`;
        const revKey = `${edge.toId}->${edge.fromId}`;
        const hasReverse = !!pairCounts[revKey];
        const sameDirIdx = seenDirCount[dirKey] || 0;
        seenDirCount[dirKey] = sameDirIdx + 1;

        const ux = dx / dist;
        const uy = dy / dist;
        const nx = -uy;
        const ny = ux;

        let offset = 0;
        if (hasReverse || pairCounts[dirKey] > 1) {
            offset = curveBase + sameDirIdx * 22;
        }

        const ctrlX = (fromPos.x + toPos.x) / 2 + nx * offset;
        const ctrlY = (fromPos.y + toPos.y) / 2 + ny * offset;

        const sdx = ctrlX - fromPos.x;
        const sdy = ctrlY - fromPos.y;
        const sLen = Math.max(1, Math.hypot(sdx, sdy));
        const startX = fromPos.x + (sdx / sLen) * nodeRadius;
        const startY = fromPos.y + (sdy / sLen) * nodeRadius;

        const edx = toPos.x - ctrlX;
        const edy = toPos.y - ctrlY;
        const eLen = Math.max(1, Math.hypot(edx, edy));
        const endX = toPos.x - (edx / eLen) * (nodeRadius + 5);
        const endY = toPos.y - (edy / eLen) * (nodeRadius + 5);

        const labelX = 0.25 * startX + 0.5 * ctrlX + 0.25 * endX;
        const labelY = 0.25 * startY + 0.5 * ctrlY + 0.25 * endY;

        const isHighlighted = (selectedRelCharId === edge.fromId || selectedRelCharId === edge.toId);
        const strokeColor = isHighlighted ? "#f59e0b" : "#64748b";
        const strokeWidth = isHighlighted ? "2.8" : "1.8";
        const markerUrl = isHighlighted ? "url(#relArrowActive)" : "url(#relArrowNormal)";
        const strokeDash = isHighlighted ? "" : "stroke-dasharray='5,4'";

        const labelStr = edge.title || "関係";
        const pillW = Math.min(140, Math.max(52, labelStr.length * 11 + 18));
        const pillH = 22;

        svgContent += `
            <path d="M ${startX.toFixed(1)} ${startY.toFixed(1)} Q ${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}"
                  fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" ${strokeDash} marker-end="${markerUrl}" />
            <rect x="${(labelX - pillW / 2).toFixed(1)}" y="${(labelY - pillH / 2).toFixed(1)}" width="${pillW}" height="${pillH}" rx="7"
                  fill="${pillBg}" stroke="${strokeColor}" stroke-width="1.2" />
            <text x="${labelX.toFixed(1)}" y="${(labelY + 4).toFixed(1)}" fill="${strokeColor}" font-size="11" font-weight="700" text-anchor="middle">${escapeHTML(labelStr.slice(0, 12))}</text>
        `;
    });

    svg.innerHTML = svgContent;
}

// =========================================
// 掛け合い会話メーカー（複数会話記録対応）
// =========================================
function createDefaultDialogueRecord(index = 1, seed = {}) {
    return {
        id: seed.id || `dlg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        title: typeof seed.title === "string" && seed.title.trim() ? seed.title.trim() : `会話記録 ${index}`,
        isPublic: seed.isPublic !== false,
        actorAId: seed.actorAId || "",
        actorBId: seed.actorBId || "",
        messages: Array.isArray(seed.messages) ? seed.messages : []
    };
}

function normalizeDialogueConfig(raw) {
    const src = raw && typeof raw === "object" ? raw : {};
    let records = [];
    if (Array.isArray(src.records) && src.records.length > 0) {
        records = src.records.map((r, idx) => createDefaultDialogueRecord(idx + 1, r));
    } else if (Array.isArray(src.messages)) {
        records = [createDefaultDialogueRecord(1, {
            id: "dlg_default",
            title: "会話記録 1",
            isPublic: src.isPublic !== false,
            actorAId: src.actorAId || "",
            actorBId: src.actorBId || "",
            messages: src.messages
        })];
    } else {
        records = [createDefaultDialogueRecord(1, { id: "dlg_default" })];
    }
    const activeRecordId = records.some(r => r.id === src.activeRecordId)
        ? src.activeRecordId
        : records[0].id;
    return {
        isPublic: src.isPublic !== false,
        activeRecordId,
        records
    };
}

let dialogueConfig = normalizeDialogueConfig(null);
let dialogueMessages = dialogueConfig.records[0].messages;

function getVisibleDialogueRecords() {
    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : true;
    const records = Array.isArray(dialogueConfig.records) ? dialogueConfig.records : [];
    return editable ? records : records.filter(r => r.isPublic !== false);
}

function getActiveDialogueRecord() {
    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : true;
    const list = getVisibleDialogueRecords();
    if (list.length === 0) {
        if (editable) {
            const fresh = createDefaultDialogueRecord(1);
            dialogueConfig.records = [fresh];
            dialogueConfig.activeRecordId = fresh.id;
            return fresh;
        }
        return null;
    }
    let found = list.find(r => r.id === dialogueConfig.activeRecordId);
    if (!found) {
        found = list[0];
        dialogueConfig.activeRecordId = found.id;
    }
    return found;
}

function syncDialogueMessagesRef() {
    const active = getActiveDialogueRecord();
    dialogueMessages = active ? active.messages : [];
    return active;
}

function loadDialogueData() {
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('id') || 'local';
    try {
        const raw = localStorage.getItem(`dialogue_data_${pageId}`);
        if (raw) {
            dialogueConfig = normalizeDialogueConfig(JSON.parse(raw));
            syncDialogueMessagesRef();
        }
    } catch (_) {}
}

function saveDialogueDataSilently() {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('id') || 'local';
    const active = getActiveDialogueRecord();
    if (active) active.messages = dialogueMessages;
    localStorage.setItem(`dialogue_data_${pageId}`, JSON.stringify(dialogueConfig));
    const user = auth.currentUser;
    if (pageId !== 'local' && user && (!currentPageAuthorId || user.uid === currentPageAuthorId)) {
        db.collection("pages").doc(pageId).set({
            dialogueData: JSON.stringify(dialogueConfig)
        }, { merge: true }).catch(console.error);
    }
}

function saveDialogueData() {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    saveDialogueDataSilently();
    showSaveToast("会話記録を保存しました！", "success");
}
window.saveDialogueData = saveDialogueData;

function toggleDialogueVisibility(checked) {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    dialogueConfig.isPublic = !!checked;
    saveDialogueDataSilently();
    if (typeof syncRoleBasedPageControls === "function") syncRoleBasedPageControls();
}
window.toggleDialogueVisibility = toggleDialogueVisibility;

function toggleDialogueRecordVisibility(checked) {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    const active = getActiveDialogueRecord();
    if (!active) return;
    active.isPublic = !!checked;
    saveDialogueDataSilently();
    renderDialogueRecords();
}
window.toggleDialogueRecordVisibility = toggleDialogueRecordVisibility;

function updateActiveDialogueTitle(titleVal) {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    const active = getActiveDialogueRecord();
    if (!active) return;
    active.title = titleVal;
    saveDialogueDataSilently();
    renderDialogueRecords();
    const titleBar = document.getElementById("dialogueActiveTitleBar");
    if (titleBar) titleBar.textContent = titleVal.trim() || "無題の会話記録";
}
window.updateActiveDialogueTitle = updateActiveDialogueTitle;

function selectDialogueRecord(recordId) {
    const list = getVisibleDialogueRecords();
    const target = list.find(r => r.id === recordId);
    if (!target) return;
    dialogueConfig.activeRecordId = target.id;
    syncDialogueMessagesRef();
    saveDialogueDataSilently();
    updateDialogueActors();
    renderDialogueTimeline();
}
window.selectDialogueRecord = selectDialogueRecord;

function createNewDialogueRecord() {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    const nextNum = (dialogueConfig.records ? dialogueConfig.records.length : 0) + 1;
    const active = getActiveDialogueRecord();
    const newRec = createDefaultDialogueRecord(nextNum, {
        title: `会話記録 ${nextNum}`,
        actorAId: active ? active.actorAId : "",
        actorBId: active ? active.actorBId : "",
        isPublic: true,
        messages: []
    });
    dialogueConfig.records.push(newRec);
    dialogueConfig.activeRecordId = newRec.id;
    syncDialogueMessagesRef();
    saveDialogueDataSilently();
    updateDialogueActors();
    renderDialogueTimeline();
    const titleInput = document.getElementById("dialogueTitleInput");
    if (titleInput) titleInput.focus();
}
window.createNewDialogueRecord = createNewDialogueRecord;

function deleteDialogueRecord(recordId, evt) {
    if (evt) evt.stopPropagation();
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    if (!confirm("この会話記録を削除しますか？")) return;
    const idx = dialogueConfig.records.findIndex(r => r.id === recordId);
    if (idx === -1) return;
    dialogueConfig.records.splice(idx, 1);
    if (dialogueConfig.records.length === 0) {
        dialogueConfig.records.push(createDefaultDialogueRecord(1));
    }
    if (!dialogueConfig.records.some(r => r.id === dialogueConfig.activeRecordId)) {
        dialogueConfig.activeRecordId = dialogueConfig.records[0].id;
    }
    syncDialogueMessagesRef();
    saveDialogueDataSilently();
    updateDialogueActors();
    renderDialogueTimeline();
}
window.deleteDialogueRecord = deleteDialogueRecord;

function renderDialogueRecords() {
    const listEl = document.getElementById("dialogueRecordsList");
    const newBtn = document.getElementById("newDialogueRecordBtn");
    const titleInput = document.getElementById("dialogueTitleInput");
    const recVisCheckbox = document.getElementById("dialogueRecordPublicCheckbox");
    const titleBar = document.getElementById("dialogueActiveTitleBar");
    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : true;

    const visibleRecords = getVisibleDialogueRecords();
    const active = syncDialogueMessagesRef();

    if (newBtn) newBtn.style.display = editable ? "" : "none";
    if (titleInput && active && document.activeElement !== titleInput) {
        titleInput.value = active.title || "";
    }
    if (recVisCheckbox && active) {
        recVisCheckbox.checked = active.isPublic !== false;
    }
    if (titleBar) {
        if (active) {
            titleBar.style.display = "flex";
            const count = Array.isArray(active.messages) ? active.messages.length : 0;
            titleBar.innerHTML = `<span>${escapeHTML((active.title || "").trim() || "無題の会話記録")}</span><span style="font-size:12px; color:var(--text-muted);">${count}件のセリフ</span>`;
        } else {
            titleBar.style.display = "none";
        }
    }

    if (!listEl) return;
    if (visibleRecords.length === 0) {
        listEl.innerHTML = `<span style="font-size:12px; color:var(--text-muted);">公開されている会話記録はまだありません。</span>`;
        return;
    }

    listEl.innerHTML = visibleRecords.map(rec => {
        const isActive = active && rec.id === active.id;
        const msgCount = Array.isArray(rec.messages) ? rec.messages.length : 0;
        const label = (rec.title || "").trim() || "無題の会話";
        return `
            <div class="dialogue-record-chip ${isActive ? 'active' : ''}" onclick="selectDialogueRecord('${rec.id}')">
                <span>${escapeHTML(label)}</span>
                <span class="dialogue-record-meta">(${msgCount})</span>
                ${(editable && rec.isPublic === false) ? `<span class="dialogue-record-priv-tag">非公開</span>` : ""}
                ${editable ? `<button type="button" class="dialogue-record-del-btn" onclick="deleteDialogueRecord('${rec.id}', event)" title="この記録を削除">✕</button>` : ""}
            </div>
        `;
    }).join("");
}

function applyDialogueRoleUI() {
    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : true;
    const isPrivate = !editable && dialogueConfig.isPublic === false;

    const readOnlyBadge = document.getElementById("dialogueReadOnlyBadge");
    const visLabel = document.getElementById("dialogueVisibilityLabel");
    const visCheckbox = document.getElementById("dialoguePublicCheckbox");
    const saveBtn = document.getElementById("saveDialogueBtn");
    const clearBtn = document.getElementById("clearDialogueBtn");
    const copyBtn = document.getElementById("copyDialogueBtn");
    const actorsCard = document.getElementById("dialogueActorsCard");
    const inputBar = document.getElementById("dialogueInputBar");
    const privateNotice = document.getElementById("dialoguePrivateNotice");
    const contentArea = document.getElementById("dialogueContentArea");
    const descEl = document.getElementById("dialoguePageDesc");

    if (visCheckbox) visCheckbox.checked = dialogueConfig.isPublic !== false;
    if (readOnlyBadge) readOnlyBadge.style.display = editable ? "none" : "inline-block";
    if (visLabel) visLabel.style.display = editable ? "inline-flex" : "none";
    if (saveBtn) saveBtn.style.display = editable ? "" : "none";
    if (clearBtn) clearBtn.style.display = editable ? "" : "none";
    if (actorsCard) actorsCard.style.display = editable ? "" : "none";
    if (inputBar) inputBar.style.display = editable ? "" : "none";

    if (isPrivate) {
        if (privateNotice) privateNotice.style.display = "block";
        if (contentArea) contentArea.style.display = "none";
        if (copyBtn) copyBtn.style.display = "none";
    } else {
        if (privateNotice) privateNotice.style.display = "none";
        if (contentArea) contentArea.style.display = "block";
        if (copyBtn) copyBtn.style.display = "";
    }

    if (descEl) {
        descEl.textContent = editable
            ? "2人のキャラクターを選んで、複数の会話記録を残したりAIで生成したりできます。"
            : "作者が作成したキャラクター同士の掛け合い会話記録（閲覧専用）です。";
    }
    renderDialogueRecords();
}
window.applyDialogueRoleUI = applyDialogueRoleUI;

function updateDialogueActors() {
    applyDialogueRoleUI();
    const actorA = document.getElementById("dialogueActorA");
    const actorB = document.getElementById("dialogueActorB");
    const speaker = document.getElementById("dialogueSpeaker");
    if (!actorA || !actorB) return;

    const active = getActiveDialogueRecord();
    const activeChars = getVisibleCharacters();
    const prevA = active ? active.actorAId : actorA.value;
    const prevB = active ? active.actorBId : actorB.value;
    const optionsHTML = activeChars.length > 0
        ? activeChars.map(c => `<option value="${c.id}">${escapeHTML(c.name)}</option>`).join("")
        : `<option value="">（キャラ未登録）</option>`;

    actorA.innerHTML = optionsHTML;
    actorB.innerHTML = optionsHTML;

    if (prevA && activeChars.some(c => String(c.id) === String(prevA))) {
        actorA.value = prevA;
    }
    if (prevB && activeChars.some(c => String(c.id) === String(prevB))) {
        actorB.value = prevB;
    } else if (activeChars[1]) {
        actorB.value = activeChars[1].id;
    }

    if (active) {
        active.actorAId = actorA.value;
        active.actorBId = actorB.value;
    }

    if (speaker) {
        const charA = activeChars.find(c => String(c.id) === String(actorA.value));
        const charB = activeChars.find(c => String(c.id) === String(actorB.value));
        speaker.innerHTML = `
            <option value="A">${charA ? escapeHTML(charA.name) : 'キャラA'}</option>
            <option value="B">${charB ? escapeHTML(charB.name) : 'キャラB'}</option>
        `;
    }
}
window.updateDialogueActors = updateDialogueActors;

function addDialogueLine(speakerRole, text) {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    const active = syncDialogueMessagesRef();
    if (!active) return;

    const role = speakerRole || document.getElementById("dialogueSpeaker")?.value || "A";
    const input = document.getElementById("dialogueLineInput");
    const msg = text || (input ? input.value.trim() : "");
    if (!msg) return;

    const actorAId = document.getElementById("dialogueActorA")?.value;
    const actorBId = document.getElementById("dialogueActorB")?.value;
    const activeChars = characters.filter(c => !c.deletedAt);
    const char = (role === "A")
        ? activeChars.find(c => String(c.id) === String(actorAId))
        : activeChars.find(c => String(c.id) === String(actorBId));

    dialogueMessages.push({
        role: role,
        charId: char ? String(char.id) : "",
        name: char ? char.name : (role === "A" ? "キャラA" : "キャラB"),
        avatar: (char && (char.iconUrl || (char.images && char.images[0]?.url))) || "",
        text: msg
    });

    if (input && !text) input.value = "";
    saveDialogueDataSilently();
    renderDialogueTimeline();
}
window.addDialogueLine = addDialogueLine;

function deleteDialogueLine(index) {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    dialogueMessages.splice(index, 1);
    saveDialogueDataSilently();
    renderDialogueTimeline();
}
window.deleteDialogueLine = deleteDialogueLine;

function renderDialogueTimeline() {
    applyDialogueRoleUI();
    const timeline = document.getElementById("dialogueTimeline");
    if (!timeline) return;

    const editable = typeof canEditCurrentPage === "function" ? canEditCurrentPage() : true;
    if (dialogueMessages.length === 0) {
        timeline.innerHTML = editable
            ? `<div style="text-align:center; padding:80px 20px; color:var(--text-muted); font-size:13px;">まだセリフがありません。下の入力欄やAI生成で会話を始めましょう！</div>`
            : `<div style="text-align:center; padding:80px 20px; color:var(--text-muted); font-size:13px;">まだ公開されている掛け合い会話がありません。</div>`;
        return;
    }

    const activeChars = characters.filter(c => !c.deletedAt);
    timeline.innerHTML = dialogueMessages.map((m, idx) => {
        const isRight = m.role === "B";
        const matchedChar = (m.charId ? activeChars.find(c => String(c.id) === String(m.charId)) : null)
            || activeChars.find(c => c.name === m.name);
        const avatarStyle = matchedChar
            ? getCharAvatarBgInlineStyle(matchedChar)
            : (m.avatar ? `background-image:url('${m.avatar}')` : 'background:var(--primary);');
        return `
            <div class="dialogue-bubble-row ${isRight ? 'right' : 'left'}">
                <div class="dialogue-avatar" style="${avatarStyle}"></div>
                <div class="dialogue-bubble-body">
                    <span class="dialogue-speaker-name">
                        ${escapeHTML(m.name)}
                        ${editable ? `<button type="button" class="dialogue-bubble-del-btn" onclick="deleteDialogueLine(${idx})" title="このセリフを削除">✕</button>` : ""}
                    </span>
                    <div class="dialogue-bubble-text">${escapeHTML(m.text)}</div>
                </div>
            </div>
        `;
    }).join("");

    timeline.scrollTop = timeline.scrollHeight;
}

async function generateAIDialogue() {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    const actorAId = document.getElementById("dialogueActorA")?.value;
    const actorBId = document.getElementById("dialogueActorB")?.value;
    const situation = document.getElementById("dialogueSituationInput")?.value || "日常の些細な雑談";

    const charA = characters.find(c => String(c.id) === String(actorAId));
    const charB = characters.find(c => String(c.id) === String(actorBId));
    if (!charA || !charB) return alert("2人のキャラクターを選択してください！");

    const prompt = `以下の2人のキャラクターの設定とシチュエーションに基づき、自然で生き生きとした掛け合い対話（6〜8往復程度）を作成してください。
形式は必ず各行「A: セリフ」または「B: セリフ」のフォーマットで出力してください。

【キャラクターA】
名前: ${charA.name}
性格: ${charA.personality || "未設定"}
世界観: ${charA.world || "未設定"}

【キャラクターB】
名前: ${charB.name}
性格: ${charB.personality || "未設定"}
世界観: ${charB.world || "未設定"}

【シチュエーション】
${situation}`;

    showSaveToast("AIが会話を生成中です...", "info", 2400);
    try {
        const res = await callAI(prompt);
        const lines = res.split("\n").filter(l => l.trim());
        lines.forEach(l => {
            const match = l.match(/^[ABＡＢ][:：]\s*(.*)$/);
            if (match) {
                const role = l.startsWith("A") || l.startsWith("Ａ") ? "A" : "B";
                addDialogueLine(role, match[1]);
            }
        });
        showSaveToast("掛け合い会話を生成しました！", "success");
    } catch (e) {
        showSaveToast("会話生成エラー: " + e.message, "error", 4000);
    }
}
window.generateAIDialogue = generateAIDialogue;

function copyDialogueLog() {
    if (dialogueMessages.length === 0) return alert("コピーするセリフがありません。");
    const text = dialogueMessages.map(m => `${m.name}: ${m.text}`).join("\n");
    navigator.clipboard.writeText(text).then(() => {
        showSaveToast("会話ログをコピーしました！", "success");
    }).catch(() => alert("コピーに失敗しました"));
}
window.copyDialogueLog = copyDialogueLog;

function clearDialogueLog() {
    if (typeof canEditCurrentPage === "function" && !canEditCurrentPage()) return;
    if (!confirm("この会話記録のセリフをリセットしますか？")) return;
    dialogueMessages.length = 0;
    saveDialogueDataSilently();
    renderDialogueTimeline();
}
window.clearDialogueLog = clearDialogueLog;

// =========================================
// 背景 ＆ 世界線デザイン設定
// =========================================
function openThemeModal() {
    const modal = document.getElementById("themeCustomizeModal");
    if (!modal) return;
    modal.style.display = "flex";

    const savedColor = localStorage.getItem("custom_theme_bgcolor") || "#f8fafc";
    const savedBg = localStorage.getItem("custom_theme_bg") || "";
    const savedFit = localStorage.getItem("custom_theme_bg_fit") || "cover";
    const colorInput = document.getElementById("themeBgColorInput");
    const colorText = document.getElementById("themeBgColorText");
    const bgUrlInput = document.getElementById("themeBgImageUrl");
    const fitSelect = document.getElementById("themeBgFitSelect");
    if (colorInput) colorInput.value = /^#[0-9a-fA-F]{6}$/.test(savedColor) ? savedColor : "#f8fafc";
    if (colorText) colorText.value = savedColor;
    if (bgUrlInput) bgUrlInput.value = savedBg;
    if (fitSelect) fitSelect.value = savedFit;

    const worldSelect = document.getElementById("worldThemeSelect");
    if (worldSelect) {
        const worlds = [...new Set(characters.filter(c => !c.deletedAt).map(c => c.world).filter(Boolean))];
        worldSelect.innerHTML = worlds.length > 0
            ? worlds.map(w => `<option value="${escapeHTML(w)}">${escapeHTML(w)}</option>`).join("")
            : `<option value="">（キャラの世界線が未登録）</option>`;
    }

    renderSavedWorldThemesList();
}
window.openThemeModal = openThemeModal;

function closeThemeModal() {
    const modal = document.getElementById("themeCustomizeModal");
    if (modal) modal.style.display = "none";
}
window.closeThemeModal = closeThemeModal;

function previewThemeColor(color) {
    if (color && /^#[0-9a-fA-F]{3,6}$/.test(color.trim())) {
        document.body.style.background = color.trim();
    } else if (color) {
        document.body.style.background = "";
        document.body.style.backgroundColor = color;
    }
    const cInput = document.getElementById("themeBgColorInput");
    const cText = document.getElementById("themeBgColorText");
    if (cInput && /^#[0-9a-fA-F]{6}$/.test(color)) cInput.value = color;
    if (cText) cText.value = color;
}
window.previewThemeColor = previewThemeColor;

function resetThemeColor() {
    document.body.style.background = "";
    document.body.style.backgroundColor = "";
    const cInput = document.getElementById("themeBgColorInput");
    const cText = document.getElementById("themeBgColorText");
    if (cInput) cInput.value = "#f8fafc";
    if (cText) cText.value = "#f8fafc";
    localStorage.removeItem("custom_theme_bgcolor");
    localStorage.removeItem("custom_theme_preset");
    applyCustomTheme();
}
window.resetThemeColor = resetThemeColor;

async function handleThemeBgFileUpload(input) {
    if (!input.files || !input.files[0]) return;
    try {
        const compressed = await compressImage(input.files[0], 1200);
        document.getElementById("themeBgImageUrl").value = compressed;
        updateThemeBgPreview(compressed);
    } catch (e) {
        showSaveToast("背景画像の読み込みに失敗しました", "error");
    }
}
window.handleThemeBgFileUpload = handleThemeBgFileUpload;

function updateThemeBgPreview(url) {
    const fit = document.getElementById("themeBgFitSelect")?.value || "cover";
    applyBgLayerImage(url, fit);
}
window.updateThemeBgPreview = updateThemeBgPreview;

function clearThemeBgImage() {
    const urlInput = document.getElementById("themeBgImageUrl");
    const fileInput = document.getElementById("themeBgFileInput");
    if (urlInput) urlInput.value = "";
    if (fileInput) fileInput.value = "";
    applyBgLayerImage("", "cover");
    localStorage.removeItem("custom_theme_bg");
}
window.clearThemeBgImage = clearThemeBgImage;

function saveThemeSettings() {
    const rawText = (document.getElementById("themeBgColorText")?.value || "").trim();
    const rawPicker = (document.getElementById("themeBgColorInput")?.value || "").trim();
    const color = rawText || rawPicker;
    const bgUrl = (document.getElementById("themeBgImageUrl")?.value || "").trim();
    const bgFit = document.getElementById("themeBgFitSelect")?.value || "cover";

    const existingColor = localStorage.getItem("custom_theme_bgcolor");
    if (color && (color.toLowerCase() !== "#f8fafc" || existingColor)) {
        localStorage.setItem("custom_theme_bgcolor", color);
    } else if (!existingColor) {
        localStorage.removeItem("custom_theme_bgcolor");
    }

    if (bgUrl) localStorage.setItem("custom_theme_bg", bgUrl);
    else localStorage.removeItem("custom_theme_bg");
    localStorage.setItem("custom_theme_bg_fit", bgFit);

    applyCustomTheme();
    closeThemeModal();
    showSaveToast("背景デザイン設定を保存しました！「ネットに保存」で共有ページにも反映されます。", "success");
}
window.saveThemeSettings = saveThemeSettings;

function applyCustomTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const preset = localStorage.getItem("custom_theme_preset");
    const color = localStorage.getItem("custom_theme_bgcolor");
    const bg = localStorage.getItem("custom_theme_bg");
    const fit = localStorage.getItem("custom_theme_bg_fit") || "cover";

    document.body.style.background = "";
    document.body.style.backgroundColor = "";

    const lightPresets = new Set(["light", "fantasy"]);
    const darkPresets = new Set(["dark", "cyber", "gothic"]);
    if (preset) {
        if ((currentTheme === "dark" && darkPresets.has(preset)) || (currentTheme === "light" && lightPresets.has(preset))) {
            const grad = getPresetGradient(preset);
            if (grad) document.body.style.background = grad;
        }
    }

    if (color) {
        if (currentTheme === "dark" && isLightColorValue(color)) {
            // ダークモード時は明るいカスタム背景色を強制せず、ダーク基調を保つ
        } else {
            document.body.style.background = color;
        }
    }

    applyBgLayerImage(bg, fit);
}

function saveWorldThemeConfig() {
    const world = document.getElementById("worldThemeSelect")?.value;
    const color = document.getElementById("worldThemeColor")?.value;
    const bgUrl = document.getElementById("worldThemeBgUrl")?.value;
    if (!world) return alert("世界線を選択してください");

    let saved = {};
    try { saved = JSON.parse(localStorage.getItem("custom_world_themes") || "{}"); } catch (e) {}
    saved[world] = { color: color, bg: bgUrl };
    localStorage.setItem("custom_world_themes", JSON.stringify(saved));
    renderSavedWorldThemesList();
    showSaveToast(`世界線「${world}」の背景を紐付け保存しました！`, "success");
}
window.saveWorldThemeConfig = saveWorldThemeConfig;

function renderSavedWorldThemesList() {
    const container = document.getElementById("worldThemeSavedList");
    if (!container) return;
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem("custom_world_themes") || "{}"); } catch (e) {}
    const entries = Object.entries(saved);
    if (entries.length === 0) {
        container.innerHTML = `<span style="color:var(--text-muted);">まだ世界線背景の紐付けはありません</span>`;
        return;
    }
    container.innerHTML = entries.map(([w, conf]) => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:4px 8px; background:rgba(0,0,0,0.03); border-radius:6px; margin-top:4px;">
            <span><strong>${escapeHTML(w)}</strong> (色: <span style="display:inline-block; width:12px; height:12px; border-radius:2px; vertical-align:middle; background:${conf.color};"></span> ${conf.bg ? '画像あり' : '画像なし'})</span>
            <button type="button" onclick="deleteWorldTheme('${escapeHTML(w)}')" class="header-btn danger" style="padding:2px 6px; font-size:10px;">削除</button>
        </div>
    `).join("");
}

function deleteWorldTheme(world) {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem("custom_world_themes") || "{}"); } catch (e) {}
    delete saved[world];
    localStorage.setItem("custom_world_themes", JSON.stringify(saved));
    renderSavedWorldThemesList();
}
window.deleteWorldTheme = deleteWorldTheme;

function applyWorldTheme(worldName) {
    if (!worldName) {
        applyCustomTheme();
        return;
    }
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem("custom_world_themes") || "{}"); } catch (e) {}
    const conf = saved[worldName];
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    if (conf) {
        document.body.style.background = "";
        document.body.style.backgroundColor = "";
        if (conf.color && !(currentTheme === "dark" && isLightColorValue(conf.color))) {
            document.body.style.background = conf.color;
        }
        const fit = localStorage.getItem("custom_theme_bg_fit") || "cover";
        applyBgLayerImage(conf.bg || localStorage.getItem("custom_theme_bg") || "", fit);
    } else {
        applyCustomTheme();
    }
}
window.applyWorldTheme = applyWorldTheme;

// リサイズクラッシュ防止ガード
let resizeTimeout = null;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        try {
            const boardPage = document.getElementById("board-page");
            if (boardPage && boardPage.style.display !== "none" && currentBoardMode === "matrix") {
                renderBoard();
            }
            const relMapPage = document.getElementById("rel-map-page");
            if (relMapPage && relMapPage.style.display !== "none") {
                renderRelationshipMap();
            }
        } catch (e) {}
    }, 150);
});

// =========================================
// キャラクター身長比較ビュー
// =========================================
let selectedHeightCompareIds = [];
let heightCompareHasUserSelection = false;
let heightCompareMode = "art"; // 'art' | 'silhouette'
let heightArtAdjustments = {};
let showHeightArtAdjustPanel = false;

function getHeightAdjustStorageKey() {
    const pageId = new URLSearchParams(window.location.search).get('id') || "local";
    return `height_art_adjust_${pageId}`;
}

function loadHeightAdjustments() {
    try {
        const raw = localStorage.getItem(getHeightAdjustStorageKey());
        const parsed = raw ? JSON.parse(raw) : {};
        heightArtAdjustments = (parsed && typeof parsed === "object") ? parsed : {};
    } catch (_) {
        heightArtAdjustments = {};
    }
}

function saveHeightAdjustments() {
    try {
        localStorage.setItem(getHeightAdjustStorageKey(), JSON.stringify(heightArtAdjustments || {}));
    } catch (_) {}
}

function getCharHeightAdjust(charId) {
    const entry = heightArtAdjustments[String(charId)];
    if (!entry || typeof entry !== "object") return { scale: 100, offsetY: 0 };
    const scale = Math.max(50, Math.min(180, Number(entry.scale) || 100));
    const offsetY = Math.max(-100, Math.min(100, Number(entry.offsetY) || 0));
    return { scale, offsetY };
}

function setHeightCompareMode(mode) {
    heightCompareMode = (mode === "silhouette") ? "silhouette" : "art";
    if (heightCompareMode === "silhouette") {
        showHeightArtAdjustPanel = false;
    }
    renderHeightComparison();
}
window.setHeightCompareMode = setHeightCompareMode;

function toggleHeightArtAdjustPanel() {
    if (heightCompareMode !== "art") {
        heightCompareMode = "art";
        showHeightArtAdjustPanel = true;
    } else {
        showHeightArtAdjustPanel = !showHeightArtAdjustPanel;
    }
    renderHeightComparison();
}
window.toggleHeightArtAdjustPanel = toggleHeightArtAdjustPanel;

function updateHeightArtAdjust(charId, field, value) {
    const idStr = String(charId);
    const cur = getCharHeightAdjust(idStr);
    if (field === "scale") cur.scale = Math.max(50, Math.min(180, Number(value) || 100));
    if (field === "offsetY") cur.offsetY = Math.max(-100, Math.min(100, Number(value) || 0));
    heightArtAdjustments[idStr] = cur;
    saveHeightAdjustments();
    renderHeightComparison();
}
window.updateHeightArtAdjust = updateHeightArtAdjust;

function resetHeightArtAdjust(charId) {
    delete heightArtAdjustments[String(charId)];
    saveHeightAdjustments();
    renderHeightComparison();
}
window.resetHeightArtAdjust = resetHeightArtAdjust;

function parseHeightCm(raw) {
    if (raw === undefined || raw === null) return null;
    const normalized = String(raw).replace(/[０-９．]/g, s => {
        if (s === "．") return ".";
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
    const m = normalized.match(/(\d+(?:\.\d+)?)/);
    if (!m) return null;
    const val = parseFloat(m[1]);
    if (!isFinite(val) || val <= 0 || val > 500) return null;
    return Math.round(val * 10) / 10;
}

function toggleHeightCompareChar(charId) {
    heightCompareHasUserSelection = true;
    const idStr = String(charId);
    const idx = selectedHeightCompareIds.indexOf(idStr);
    if (idx !== -1) {
        selectedHeightCompareIds.splice(idx, 1);
    } else {
        selectedHeightCompareIds.push(idStr);
    }
    renderHeightComparison();
}
window.toggleHeightCompareChar = toggleHeightCompareChar;

function selectHeightComparePreset(mode) {
    heightCompareHasUserSelection = true;
    const pool = getVisibleCharacters();
    const worldFilter = document.getElementById("heightCompareWorldFilter")?.value || "";
    const filtered = pool.filter(c => !worldFilter || c.world === worldFilter);
    if (mode === "none") {
        selectedHeightCompareIds = [];
    } else if (mode === "all") {
        selectedHeightCompareIds = filtered.map(c => String(c.id));
    } else {
        selectedHeightCompareIds = filtered.filter(c => parseHeightCm(c.height) !== null).map(c => String(c.id));
    }
    renderHeightComparison();
}
window.selectHeightComparePreset = selectHeightComparePreset;

function updateCharHeightQuick(charId, rawVal) {
    if (!canEditCurrentPage()) return;
    const char = characters.find(c => String(c.id) === String(charId));
    if (!char) return;
    char.height = String(rawVal || "").trim();
    localStorage.setItem("characters", JSON.stringify(characters));
    persistCharacterToCloud(char);
    display();
    renderHeightComparison();
}
window.updateCharHeightQuick = updateCharHeightQuick;

function renderHeightComparison() {
    const picker = document.getElementById("heightComparePicker");
    const stage = document.getElementById("heightCompareStage");
    const countText = document.getElementById("heightCompareCountText");
    const worldSelect = document.getElementById("heightCompareWorldFilter");
    const artModeBtn = document.getElementById("heightModeArtBtn");
    const silModeBtn = document.getElementById("heightModeSilhouetteBtn");
    const adjustToggleBtn = document.getElementById("heightArtAdjustToggleBtn");
    const modeHintEl = document.getElementById("heightModeHint");
    const adjustPanel = document.getElementById("heightArtAdjustPanel");
    if (!picker || !stage) return;

    if (artModeBtn) artModeBtn.classList.toggle("active", heightCompareMode === "art");
    if (silModeBtn) silModeBtn.classList.toggle("active", heightCompareMode === "silhouette");
    if (adjustToggleBtn) {
        adjustToggleBtn.style.display = heightCompareMode === "art" ? "" : "none";
        adjustToggleBtn.classList.toggle("active", showHeightArtAdjustPanel);
    }
    if (modeHintEl) {
        modeHintEl.textContent = heightCompareMode === "silhouette"
            ? "シルエット表示では余白の影響を受けずに正確な身長差を比較できます"
            : "※ 破線（身長ライン）に合わせて「微調整」で立ち絵の縮尺・余白を揃えられます";
    }

    const pool = getVisibleCharacters();
    if (worldSelect) {
        const prev = worldSelect.value;
        const worlds = [...new Set(pool.map(c => c.world).filter(Boolean))];
        worldSelect.innerHTML = `<option value="">すべての世界線</option>` +
            worlds.map(w => `<option value="${escapeHTML(w)}">${escapeHTML(w)}</option>`).join("");
        if (prev && worlds.includes(prev)) worldSelect.value = prev;
    }

    const selectedWorld = worldSelect ? worldSelect.value : "";
    const filtered = pool.filter(c => !selectedWorld || c.world === selectedWorld);

    if (!heightCompareHasUserSelection && selectedHeightCompareIds.length === 0) {
        const withH = filtered.filter(c => parseHeightCm(c.height) !== null);
        if (withH.length > 0) {
            selectedHeightCompareIds = withH.slice(0, 8).map(c => String(c.id));
        }
    }

    const visibleIdSet = new Set(filtered.map(c => String(c.id)));
    const activeIds = selectedHeightCompareIds.filter(id => visibleIdSet.has(id));
    const editable = canEditCurrentPage();

    picker.innerHTML = filtered.length === 0
        ? `<span style="font-size:12px; color:var(--text-muted);">表示できるキャラクターがいません。</span>`
        : filtered.map(c => {
            const idStr = String(c.id);
            const isSel = activeIds.includes(idStr);
            const hCm = parseHeightCm(c.height);
            const thumbInfo = getCharThumbnailInfo(c);
            const quickInput = editable
                ? `<input type="text" class="height-quick-input" value="${escapeHTML(String(c.height || ""))}" placeholder="cm" onclick="event.stopPropagation()" onchange="updateCharHeightQuick('${idStr}', this.value)" title="身長(cm)を直接入力">`
                : `<span style="font-size:11px; color:var(--text-muted);">${hCm !== null ? `${hCm}cm` : "未設定"}</span>`;
            return `
                <div class="height-picker-chip ${isSel ? 'active' : ''}" onclick="toggleHeightCompareChar('${idStr}')">
                    ${thumbInfo.url ? `<img src="${escapeHTML(thumbInfo.url)}" alt="" style="${getCharAvatarImgStyle(c)}">` : ''}
                    <span>${escapeHTML(c.name)}</span>
                    ${quickInput}
                </div>
            `;
        }).join("");

    if (countText) countText.textContent = `${activeIds.length}人選択中`;

    const selectedChars = activeIds
        .map(id => filtered.find(c => String(c.id) === id))
        .filter(Boolean);

    const measured = selectedChars.filter(c => parseHeightCm(c.height) !== null);

    if (adjustPanel) {
        if (heightCompareMode === "art" && showHeightArtAdjustPanel && measured.length > 0) {
            adjustPanel.style.display = "flex";
            adjustPanel.innerHTML = measured.map(c => {
                const adj = getCharHeightAdjust(c.id);
                const idStr = String(c.id);
                return `
                    <div class="height-adjust-row">
                        <span class="height-adjust-char-name" style="color:${c.color || 'var(--text-main)'};">${escapeHTML(c.name)}</span>
                        <label class="height-adjust-control">
                            <span>拡大率 ${adj.scale}%</span>
                            <input type="range" min="50" max="180" step="2" value="${adj.scale}" oninput="updateHeightArtAdjust('${idStr}', 'scale', this.value)">
                        </label>
                        <label class="height-adjust-control">
                            <span>上下 ${adj.offsetY >= 0 ? '+' : ''}${adj.offsetY}px</span>
                            <input type="range" min="-80" max="80" step="2" value="${adj.offsetY}" oninput="updateHeightArtAdjust('${idStr}', 'offsetY', this.value)">
                        </label>
                        <button type="button" class="header-btn secondary" style="padding:3px 9px; font-size:11px;" onclick="resetHeightArtAdjust('${idStr}')">リセット</button>
                    </div>
                `;
            }).join("");
        } else {
            adjustPanel.style.display = "none";
            adjustPanel.innerHTML = "";
        }
    }

    if (selectedChars.length === 0 || measured.length === 0) {
        stage.innerHTML = `
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; text-align:center; color:var(--text-muted); font-size:14px;">
                ${selectedChars.length === 0
                    ? "上のリストから比較したいキャラクターを選択してください。"
                    : "選択中のキャラクターに「身長 (cm)」が登録されていません。上の入力欄または編集画面から身長を入力してください。"}
            </div>
        `;
        return;
    }

    const heights = measured.map(c => parseHeightCm(c.height));
    const maxCharHeight = Math.max(...heights);
    const scaleMax = Math.max(200, Math.ceil((maxCharHeight + 25) / 20) * 20);
    const step = scaleMax > 260 ? 50 : 20;

    let gridHtml = `<div class="height-gridlines-layer">`;
    for (let cm = 0; cm <= scaleMax; cm += step) {
        const bottomPct = (cm / scaleMax) * 100;
        gridHtml += `
            <div class="height-gridline ${cm === 0 ? 'is-ground' : ''}" style="bottom:${bottomPct.toFixed(2)}%;">
                <span class="height-gridline-label">${cm}cm</span>
            </div>
        `;
    }
    gridHtml += `</div>`;

    const colsHtml = selectedChars.map(c => {
        const cm = parseHeightCm(c.height);
        if (cm === null) return "";
        const heightPct = Math.max(5, (cm / scaleMax) * 100);
        const diff = Math.round((cm - maxCharHeight) * 10) / 10;
        const diffLabel = diff === 0 ? "最高身長" : `基準差 ${diff}cm`;
        const artUrl = (c.images && c.images[0] && c.images[0].url) ? c.images[0].url : "";
        const thumbInfo = getCharThumbnailInfo(c);
        const color = c.color || "var(--primary)";
        const adj = getCharHeightAdjust(c.id);

        let visualInner = "";
        if (heightCompareMode === "art" && artUrl) {
            const scaleVal = (adj.scale / 100).toFixed(2);
            const transformStyle = `transform: translateY(${adj.offsetY}px) scale(${scaleVal});`;
            visualInner = `
                <div class="height-top-guide-line" style="border-top-color:${color};"></div>
                <div class="height-art-clip">
                    <img class="height-standing-img" src="${escapeHTML(artUrl)}" alt="${escapeHTML(c.name)}" style="${transformStyle}">
                </div>
            `;
        } else {
            visualInner = `
                <div class="height-silhouette" style="border-color:${color}; background:${color}22;">
                    ${thumbInfo.url ? `<img src="${escapeHTML(thumbInfo.url)}" alt="" style="${getCharAvatarImgStyle(c)}">` : `<span style="font-weight:800; font-size:14px; color:${color};">${escapeHTML((c.name || "?").slice(0, 1))}</span>`}
                </div>
            `;
        }

        return `
            <div class="height-character-col">
                <div class="height-figure-box" style="height:${heightPct.toFixed(2)}%;" onclick="openCharacterDetail(${c.id})" title="${escapeHTML(c.name)} (${cm}cm)">
                    <span class="height-marker-pill" style="border-color:${color};">${cm}cm</span>
                    ${visualInner}
                </div>
                <div class="height-char-footer">
                    <div class="height-char-name" style="color:${color};">${escapeHTML(c.name)}</div>
                    <div class="height-char-diff">${diffLabel}</div>
                </div>
            </div>
        `;
    }).join("");

    stage.innerHTML = `${gridHtml}<div class="height-characters-row">${colsHtml}</div>`;
}
window.renderHeightComparison = renderHeightComparison;

async function exportHeightCompareImage() {
    const pool = getVisibleCharacters();
    const worldFilter = document.getElementById("heightCompareWorldFilter")?.value || "";
    const filtered = pool.filter(c => !worldFilter || c.world === worldFilter);
    const selectedChars = selectedHeightCompareIds
        .map(id => filtered.find(c => String(c.id) === id))
        .filter(c => c && parseHeightCm(c.height) !== null);

    if (selectedChars.length === 0) {
        showSaveToast("身長が登録されたキャラクターを選択してください", "error");
        return;
    }

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const bgColor = isDark ? "#0f172a" : "#ffffff";
    const textColor = isDark ? "#f1f5f9" : "#0f172a";
    const mutedColor = isDark ? "#94a3b8" : "#64748b";
    const lineColor = isDark ? "rgba(148,163,184,0.28)" : "rgba(148,163,184,0.4)";

    const colW = 160;
    const padLeft = 80;
    const padRight = 40;
    const width = Math.max(760, padLeft + padRight + selectedChars.length * colW);
    const height = 620;
    const topMargin = 78;
    const bottomMargin = 72;
    const plotH = height - topMargin - bottomMargin;

    const maxH = Math.max(...selectedChars.map(c => parseHeightCm(c.height)));
    const scaleMax = Math.max(200, Math.ceil((maxH + 25) / 20) * 20);
    const step = scaleMax > 260 ? 50 : 20;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = textColor;
    ctx.font = "bold 20px 'Noto Sans JP', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("キャラクター身長比較ビュー", 24, 38);

    const loadImg = (src) => new Promise(resolve => {
        if (!src) return resolve(null);
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
    });

    for (let cm = 0; cm <= scaleMax; cm += step) {
        const y = topMargin + plotH - (cm / scaleMax) * plotH;
        ctx.strokeStyle = cm === 0 ? textColor : lineColor;
        ctx.lineWidth = cm === 0 ? 2 : 1;
        ctx.setLineDash(cm === 0 ? [] : [5, 5]);
        ctx.beginPath();
        ctx.moveTo(padLeft - 10, y);
        ctx.lineTo(width - padRight, y);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = mutedColor;
        ctx.font = "bold 12px 'Noto Sans JP', sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(`${cm}cm`, padLeft - 16, y + 4);
    }

    for (let i = 0; i < selectedChars.length; i++) {
        const c = selectedChars[i];
        const cm = parseHeightCm(c.height);
        const figH = Math.max(20, (cm / scaleMax) * plotH);
        const cx = padLeft + i * colW + colW / 2;
        const groundY = topMargin + plotH;
        const topY = groundY - figH;
        const color = c.color || "#5865f2";

        const artUrl = (c.images && c.images[0] && c.images[0].url) ? c.images[0].url : "";
        const thumbInfo = getCharThumbnailInfo(c);

        if (heightCompareMode === "art" && artUrl) {
            const img = await loadImg(artUrl);
            if (img) {
                const adj = getCharHeightAdjust(c.id);
                const ratio = img.width / Math.max(1, img.height);
                let drawH = figH;
                let drawW = drawH * ratio;
                if (drawW > colW - 20) {
                    drawW = colW - 20;
                    drawH = drawW / ratio;
                }
                const scaleMul = adj.scale / 100;
                drawW *= scaleMul;
                drawH *= scaleMul;
                ctx.drawImage(img, cx - drawW / 2, groundY - drawH + adj.offsetY, drawW, drawH);
            }
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(cx - 40, topY);
            ctx.lineTo(cx + 40, topY);
            ctx.stroke();
            ctx.setLineDash([]);
        } else {
            ctx.fillStyle = `${color}33`;
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(cx - 28, topY, 56, figH, [28, 28, 6, 6]);
            ctx.fill();
            ctx.stroke();
            if (thumbInfo.url) {
                const avatarImg = await loadImg(thumbInfo.url);
                if (avatarImg) {
                    const r = 18;
                    const ax = cx;
                    const ay = topY + 26;
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(ax, ay, r, 0, Math.PI * 2);
                    ctx.clip();
                    const pos = thumbInfo.isFallback ? thumbInfo.position : "center";
                    if (pos === "contain") {
                        ctx.fillStyle = "#ffffff";
                        ctx.fillRect(ax - r, ay - r, r * 2, r * 2);
                        const sc = Math.min((r * 2) / Math.max(1, avatarImg.width), (r * 2) / Math.max(1, avatarImg.height));
                        ctx.drawImage(avatarImg, ax - (avatarImg.width * sc) / 2, ay - (avatarImg.height * sc) / 2, avatarImg.width * sc, avatarImg.height * sc);
                    } else {
                        const asp = avatarImg.width / Math.max(1, avatarImg.height);
                        let dw = r * 2, dh = r * 2, dx = ax - r, dy = ay - r;
                        if (asp > 1) { dw = dh * asp; dx = ax - dw / 2; }
                        else {
                            dh = dw / asp;
                            if (pos === "top") dy = ay - r;
                            else if (pos === "bottom") dy = ay + r - dh;
                            else dy = ay - dh / 2;
                        }
                        ctx.drawImage(avatarImg, dx, dy, dw, dh);
                    }
                    ctx.restore();
                }
            }
        }

        ctx.fillStyle = color;
        ctx.font = "bold 13px 'Noto Sans JP', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`${cm}cm`, cx, topY - 8);

        ctx.fillStyle = textColor;
        ctx.font = "bold 14px 'Noto Sans JP', sans-serif";
        ctx.fillText((c.name || "").slice(0, 12), cx, groundY + 24);
    }

    try {
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = `height_compare_${Date.now()}.png`;
        a.click();
        showSaveToast("身長比較画像を保存しました！", "success");
    } catch (e) {
        showSaveToast("外部画像の影響で出力できませんでした", "error");
    }
}
window.exportHeightCompareImage = exportHeightCompareImage;

// =========================================
// 世界線年表（タイムライン）
// =========================================
let timelineEvents = [];
let activeTimelineWorld = "すべて";
let editTimelineEventId = null;
let tempTimelineCharIds = [];

function getTimelineStorageKey() {
    const pageId = new URLSearchParams(window.location.search).get('id') || "local";
    return `world_timeline_${pageId}`;
}

function loadTimelineData() {
    const raw = localStorage.getItem(getTimelineStorageKey());
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            timelineEvents = Array.isArray(parsed) ? parsed : [];
        } catch (_) {
            timelineEvents = [];
        }
    } else {
        timelineEvents = [];
    }
}

async function syncTimelineToCloud() {
    const pageId = new URLSearchParams(window.location.search).get('id');
    const user = auth.currentUser;
    if (pageId && user && (!currentPageAuthorId || user.uid === currentPageAuthorId)) {
        try {
            await db.collection("pages").doc(pageId).set({
                timelineData: JSON.stringify(timelineEvents || [])
            }, { merge: true });
        } catch (err) {
            console.error("Timeline cloud sync error:", err);
        }
    }
}

function guessTimelineSortKey(dateLabel) {
    if (!dateLabel) return 0;
    const normalized = String(dateLabel).replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
    const nums = normalized.match(/-?\d+/g);
    if (!nums || nums.length === 0) return 0;
    const main = parseInt(nums[0], 10);
    const sub = nums[1] ? parseInt(nums[1], 10) / 100 : 0;
    const isBce = /紀元前|BC|B\.C\./i.test(normalized);
    return isBce ? -Math.abs(main) : (main + sub);
}

function selectTimelineWorld(worldName) {
    activeTimelineWorld = worldName || "すべて";
    renderTimelineEntries();
}
window.selectTimelineWorld = selectTimelineWorld;

function renderTimelineEntries() {
    const tabsEl = document.getElementById("timelineWorldTabs");
    const listEl = document.getElementById("timelineList");
    const addBtn = document.getElementById("addTimelineEventBtn");
    if (!tabsEl || !listEl) return;

    const editable = canEditCurrentPage();
    if (addBtn) addBtn.style.display = editable ? "" : "none";

    const visibleEvents = timelineEvents.filter(ev => editable || ev.isPublic !== false);
    const charWorlds = getVisibleCharacters().map(c => c.world).filter(Boolean);
    const eventWorlds = visibleEvents.map(ev => ev.world).filter(Boolean);
    const worldTabs = ["すべて", ...new Set([...eventWorlds, ...charWorlds])];

    if (!worldTabs.includes(activeTimelineWorld)) activeTimelineWorld = "すべて";

    tabsEl.innerHTML = worldTabs.map(w => `
        <button type="button" class="timeline-world-tab ${activeTimelineWorld === w ? 'active' : ''}" onclick="selectTimelineWorld('${escapeHTML(w)}')">${escapeHTML(w)}</button>
    `).join("");

    const filtered = visibleEvents
        .filter(ev => activeTimelineWorld === "すべて" || (ev.world || "共通") === activeTimelineWorld)
        .sort((a, b) => {
            const ka = (typeof a.sortKey === "number" && isFinite(a.sortKey)) ? a.sortKey : guessTimelineSortKey(a.dateLabel);
            const kb = (typeof b.sortKey === "number" && isFinite(b.sortKey)) ? b.sortKey : guessTimelineSortKey(b.dateLabel);
            if (ka !== kb) return ka - kb;
            return (a.createdAt || a.id || 0) - (b.createdAt || b.id || 0);
        });

    if (filtered.length === 0) {
        listEl.innerHTML = `<div style="padding:24px; background:var(--card-bg); border:1px solid var(--card-border); border-radius:12px; color:var(--text-muted); font-size:13px;">
            ${editable ? "この世界線にはまだ年表の出来事が登録されていません。「＋ 出来事を追加」から作成できます。" : "公開されている年表の出来事はまだありません。"}
        </div>`;
        return;
    }

    const visChars = getVisibleCharacters();
    listEl.innerHTML = filtered.map(ev => {
        const charChips = (ev.charIds || []).map(cid => {
            const c = visChars.find(ch => String(ch.id) === String(cid));
            if (!c) return "";
            const thumbInfo = getCharThumbnailInfo(c);
            return `<span class="birthday-spotlight-chip" style="padding:3px 9px 3px 4px; font-size:12px;" onclick="openCharacterDetail(${c.id})">
                ${thumbInfo.url ? `<img src="${escapeHTML(thumbInfo.url)}" alt="" style="${getCharAvatarImgStyle(c)}">` : ""}${escapeHTML(c.name)}
            </span>`;
        }).filter(Boolean).join(" ");

        const privBadge = (editable && ev.isPublic === false) ? `<span class="novel-private-pill">非公開</span>` : "";
        const actionsHtml = editable ? `
            <div style="display:flex; gap:6px; align-items:center;">
                <button type="button" class="header-btn secondary" style="padding:3px 9px; font-size:11px;" onclick="toggleTimelineEventVisibility('${ev.id}')">${ev.isPublic === false ? "公開する" : "非公開にする"}</button>
                <button type="button" class="header-btn secondary" style="padding:3px 9px; font-size:11px;" onclick="openTimelineEditor('${ev.id}')">編集</button>
                <button type="button" class="header-btn danger" style="padding:3px 9px; font-size:11px;" onclick="deleteTimelineEvent('${ev.id}')">削除</button>
            </div>
        ` : "";

        return `
            <div class="timeline-event-card">
                <div class="timeline-event-top">
                    <div style="display:flex; align-items:center; flex-wrap:wrap; gap:6px;">
                        <span class="timeline-date-pill">${escapeHTML(ev.dateLabel || "時期未設定")}</span>
                        <span class="timeline-world-pill">${escapeHTML(ev.world || "共通")}</span>
                        ${privBadge}
                    </div>
                    ${actionsHtml}
                </div>
                <h3 style="margin:4px 0 6px; font-size:16px; color:var(--text-main);">${escapeHTML(ev.title || "")}</h3>
                ${ev.description ? `<p style="margin:0 0 8px; font-size:13px; color:var(--text-main); white-space:pre-wrap; line-height:1.6;">${escapeHTML(ev.description)}</p>` : ""}
                ${charChips ? `<div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;">${charChips}</div>` : ""}
            </div>
        `;
    }).join("");
}
window.renderTimelineEntries = renderTimelineEntries;

function renderTimelineCharPicker() {
    const picker = document.getElementById("timelineEventCharsPicker");
    if (!picker) return;
    const pool = getVisibleCharacters();
    if (pool.length === 0) {
        picker.innerHTML = `<span style="font-size:12px; color:var(--text-muted);">キャラクターがまだ登録されていません</span>`;
        return;
    }
    picker.innerHTML = pool.map(c => {
        const idStr = String(c.id);
        const isSel = tempTimelineCharIds.includes(idStr);
        const thumbInfo = getCharThumbnailInfo(c);
        return `<button type="button" class="timeline-char-chip ${isSel ? 'selected' : ''}" onclick="toggleTimelineEventChar('${idStr}')">
            ${thumbInfo.url ? `<img src="${escapeHTML(thumbInfo.url)}" alt="" style="${getCharAvatarImgStyle(c)}">` : ""}${escapeHTML(c.name)}
        </button>`;
    }).join("");
}

function toggleTimelineEventChar(charId) {
    const idStr = String(charId);
    const idx = tempTimelineCharIds.indexOf(idStr);
    if (idx !== -1) tempTimelineCharIds.splice(idx, 1);
    else tempTimelineCharIds.push(idStr);
    renderTimelineCharPicker();
}
window.toggleTimelineEventChar = toggleTimelineEventChar;

function openTimelineEditor(eventId = null) {
    if (!canEditCurrentPage()) return;
    const modal = document.getElementById("timelineEventModal");
    if (!modal) return;
    editTimelineEventId = eventId;

    const worldList = document.getElementById("timelineWorldDatalist");
    if (worldList) {
        const worlds = [...new Set(["共通", ...characters.filter(c => !c.deletedAt).map(c => c.world).filter(Boolean), ...timelineEvents.map(e => e.world).filter(Boolean)])];
        worldList.innerHTML = worlds.map(w => `<option value="${escapeHTML(w)}">`).join("");
    }

    const titleLabel = document.getElementById("timelineModalTitle");
    const worldInput = document.getElementById("timelineEventWorld");
    const dateInput = document.getElementById("timelineEventDate");
    const sortInput = document.getElementById("timelineEventSortKey");
    const titleInput = document.getElementById("timelineEventTitle");
    const descInput = document.getElementById("timelineEventDesc");
    const publicCheck = document.getElementById("timelineEventPublicCheckbox");

    const existing = eventId ? timelineEvents.find(e => String(e.id) === String(eventId)) : null;
    if (existing) {
        if (titleLabel) titleLabel.textContent = "年表の出来事を編集";
        if (worldInput) worldInput.value = existing.world || "共通";
        if (dateInput) dateInput.value = existing.dateLabel || "";
        if (sortInput) sortInput.value = (typeof existing.sortKey === "number" && isFinite(existing.sortKey)) ? existing.sortKey : "";
        if (titleInput) titleInput.value = existing.title || "";
        if (descInput) descInput.value = existing.description || "";
        if (publicCheck) publicCheck.checked = (existing.isPublic !== false);
        tempTimelineCharIds = Array.isArray(existing.charIds) ? existing.charIds.map(String) : [];
    } else {
        if (titleLabel) titleLabel.textContent = "年表に出来事を追加";
        if (worldInput) worldInput.value = (activeTimelineWorld && activeTimelineWorld !== "すべて") ? activeTimelineWorld : "共通";
        if (dateInput) dateInput.value = "";
        if (sortInput) sortInput.value = "";
        if (titleInput) titleInput.value = "";
        if (descInput) descInput.value = "";
        if (publicCheck) publicCheck.checked = true;
        tempTimelineCharIds = [];
    }

    renderTimelineCharPicker();
    modal.style.display = "flex";
}
window.openTimelineEditor = openTimelineEditor;

function closeTimelineEditor() {
    const modal = document.getElementById("timelineEventModal");
    if (modal) modal.style.display = "none";
}
window.closeTimelineEditor = closeTimelineEditor;

function saveTimelineEvent() {
    if (!canEditCurrentPage()) return;
    const title = (document.getElementById("timelineEventTitle")?.value || "").trim();
    if (!title) {
        showSaveToast("出来事のタイトルを入力してください！", "error");
        return;
    }
    const world = (document.getElementById("timelineEventWorld")?.value || "").trim() || "共通";
    const dateLabel = (document.getElementById("timelineEventDate")?.value || "").trim() || "時期未設定";
    const sortRaw = (document.getElementById("timelineEventSortKey")?.value || "").trim();
    const sortKey = sortRaw !== "" && isFinite(Number(sortRaw)) ? Number(sortRaw) : guessTimelineSortKey(dateLabel);
    const description = (document.getElementById("timelineEventDesc")?.value || "").trim();
    const isPublic = document.getElementById("timelineEventPublicCheckbox")?.checked !== false;

    if (editTimelineEventId) {
        const idx = timelineEvents.findIndex(e => String(e.id) === String(editTimelineEventId));
        if (idx !== -1) {
            timelineEvents[idx] = {
                ...timelineEvents[idx],
                world,
                dateLabel,
                sortKey,
                title,
                description,
                charIds: [...tempTimelineCharIds],
                isPublic,
                updatedAt: Date.now()
            };
        }
    } else {
        timelineEvents.push({
            id: `tl_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            world,
            dateLabel,
            sortKey,
            title,
            description,
            charIds: [...tempTimelineCharIds],
            isPublic,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
    }

    localStorage.setItem(getTimelineStorageKey(), JSON.stringify(timelineEvents));
    syncTimelineToCloud();
    closeTimelineEditor();
    renderTimelineEntries();
    showSaveToast("年表に出来事を保存しました！", "success");
}
window.saveTimelineEvent = saveTimelineEvent;

function toggleTimelineEventVisibility(eventId) {
    if (!canEditCurrentPage()) return;
    const ev = timelineEvents.find(e => String(e.id) === String(eventId));
    if (!ev) return;
    ev.isPublic = (ev.isPublic === false);
    ev.updatedAt = Date.now();
    localStorage.setItem(getTimelineStorageKey(), JSON.stringify(timelineEvents));
    syncTimelineToCloud();
    renderTimelineEntries();
    showSaveToast(ev.isPublic ? "出来事を公開設定にしました" : "出来事を非公開にしました", "info");
}
window.toggleTimelineEventVisibility = toggleTimelineEventVisibility;

function deleteTimelineEvent(eventId) {
    if (!canEditCurrentPage()) return;
    if (!confirm("この年表の出来事を削除しますか？")) return;
    timelineEvents = timelineEvents.filter(e => String(e.id) !== String(eventId));
    localStorage.setItem(getTimelineStorageKey(), JSON.stringify(timelineEvents));
    syncTimelineToCloud();
    renderTimelineEntries();
    showSaveToast("年表の出来事を削除しました", "info");
}
window.deleteTimelineEvent = deleteTimelineEvent;

// 初期化時にアクセスカウンターと背景を反映
window.addEventListener("DOMContentLoaded", () => {
    setupPatPatInteraction();
    updateVisitorCounter();
    applyCustomTheme();
    updateDialogueActors();
    if (typeof loadTimelineData === "function") loadTimelineData();
    if (typeof renderHomeBirthdaySpotlight === "function") renderHomeBirthdaySpotlight();

    const pendingToast = sessionStorage.getItem("pending_toast");
    if (pendingToast) {
        sessionStorage.removeItem("pending_toast");
        showSaveToast(pendingToast, "success");
    }
});



