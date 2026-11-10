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
// 多言語対応（i18n）の辞書
// =========================================
const translations = {
    ja: {
        "header.notLoggedIn": "未ログイン（閲覧モード）",
        "header.pleaseLogin": "ログインしてください",
        "header.publish": "ネットに保存 (公開)",
        "header.googleLogin": "Googleでログイン",
        "header.myPage": "マイページ",
        "header.noMyPage": "まだページがありません。スタートページの「新しいページを作成する」から作成してください。",
        "header.myPageFailed": "マイページを開けませんでした。もう一度お試しください。",
        "ai.notDeployed": "AIの関数がサーバーに見つかりません。Netlifyに関数付きでデプロイされているか確認してください。",
        "ai.unknownError": "AIから応答を受け取れませんでした",
        "ai.errorPrefix": "通信エラーが発生しました: ",
        "header.logout": "ログアウト",
        "header.switchAccount": "アカウント切替",
        "header.switchAccountFailed": "アカウントの切り替えに失敗しました。",
        "sidebar.title": "メニュー",
        "sidebar.home": " ホーム / ギャラリー",
        "sidebar.characters": " キャラクター図鑑",
        "sidebar.novel": " 小説・ストーリー",
        "portal.newsTitle": "\\ うちよそ管理サイトからのお知らせ /",
        "portal.newsLoading": "お知らせを読み込み中...",
        "portal.noNewsYet": "現在、お知らせはありません。",
        "portal.editNewsBtn": "お知らせを編集する（管理者専用）",
        "portal.editNewsTitle": "お知らせの編集（管理者モード）",
        "portal.newsPlaceholder": "お知らせ内容を入力してください...",
        "portal.saveNews": "お知らせを保存",
        "portal.newPagePrompt": "新しいページを作り始めますか？",
        "portal.createPageBtn": "新しいページを作成する",
        "portal.creatorListTitle": " クリエイター一覧",
        "portal.creatorListHint": "名前にマウスを乗せると、各作者のマイページへ行けます！",
        "portal.adminLogin": " 管理者モードでログイン",
        "profile.editBtn": "プロフィールを編集",
        "profile.nameLabel": "作者名",
        "profile.namePlaceholder": "作者名（ニックネーム）",
        "profile.bioLabel": "自己紹介",
        "profile.bioPlaceholder": "推し傾向、地雷、固定メンバーへの一言など",
        "profile.snsLabel": "主要SNS（空欄でOK）",
        "profile.extraLinksLabel": "その他の外部リンク（自由に追加）",
        "profile.linkNamePlaceholder": "リンク名（例: 個人サイト）",
        "common.urlPlaceholder": "https://...",
        "common.addToList": "リストに追加",
        "common.save": "保存する",
        "common.cancel": "キャンセル",
        "common.close": "閉じる",
        "common.search": "検索",
        "common.addLinkToList": "リストにリンクを追加",
        "common.addRelation": "リストに関係性を追加",
        "home.introText": "キャラクター、そして彼らが紡ぐ物語の記録をすべてここにまとめています。（仮）",
        "home.galleryManageTitle": " ギャラリー画像の管理",
        "home.galleryManageDesc": "ホーム画面の最上部に流す、自慢の一枚絵を追加・削除できます。",
        "home.galleryTitlePlaceholder": "画像のタイトル（例: 集合絵、立ち絵など）",
        "home.addImageBtn": "画像を追加",
        "home.registeredImagesLabel": " 登録済み画像一覧:",
        "char.pageTitle": "キャラクター管理",
        "char.advancedSearchBtn": "詳細検索（世界線・タグ）",
        "char.randomPickBtn": "今日描くキャラ",
        "char.worldSearchPlaceholder": "世界線で検索",
        "char.worldPickLabel": "世界線から選ぶ:",
        "char.tagPickLabel": "タグから選ぶ:",
        "trash.title": "ゴミ箱（30日間保管したあと自動的に完全削除されます）",
        "trash.empty": "ゴミ箱は空です。",
        "char.sortNew": "新しい順",
        "char.sortOld": "古い順",
        "char.sortName": "名前順",
        "char.sortFavorite": "お気に入り順",
        "char.fullscreenBtn": "入力画面を大画面表示する",
        "char.backupSaveBtn": "バックアップ保存",
        "char.backupLoadBtn": "バックアップ読込",
        "char.pasteImportTitle": "他サイトからコピペでインポート:",
        "char.pasteImportPlaceholder": "ここにデータをCtrl+V（貼り付け）してね",
        "char.parseImportBtn": "データを解析して図鑑に追加する",
        "char.jsonImportTitle": "他サイトのデータ（JSONファイル）をインポート:",
        "char.worldPlaceholder": "世界線",
        "char.groupPlaceholder": "組織・ユニット（例: 暗殺組織、警察、○○騎士団など）",
        "char.tagPlaceholder": "タグ (カンマ区切り)",
        "char.namePlaceholder": "名前",
        "char.furiganaPlaceholder": "ふりがな（任意・カード表示に小さくルビとして付きます）",
        "char.personalityPlaceholder": "性格",
        "char.occupationPlaceholder": "職業",
        "char.labelWorld": "世界線:",
        "char.labelTag": "タグ:",
        "char.labelOccupation": "職業:",
        "char.labelPersonality": "性格:",
        "char.labelBirthday": "誕生日:",
        "char.labelRelations": "関係性:",
        "char.birthdayPlaceholder": "誕生日",
        "char.favColorLabel": "推し色:",
        "char.linksLabel": "関連リンクの追加",
        "char.linkTitlePlaceholder": "リンク先タイトルを入力",
        "char.themeVideoLabel": "イメソン・テーマ動画（YouTube）",
        "char.addVideoBtn": "＋ 動画URLを追加",
        "char.memoLabel": "メモ・詳細設定（タイトルごとに分けられます）",
        "char.addMemoBtn": "＋ 新しいメモ枠を追加",
        "char.aiStoryBtn": "AIにバックストーリーを執筆してもらう",
        "char.relationsLabel": "関係性の追加",
        "char.relationTitlePlaceholder": "例: 相棒、ライバル、片思い",
        "char.costumeLabel": "衣装・立ち絵の登録（メインも別衣装もここから！）",
        "char.costumeNamePlaceholder": "衣装名（例：メイン、学生衣装、幼少期）",
        "char.addCostumeBtn": "衣装をリストに追加",
        "char.submitBtn": "追加・更新",
        "char.thumbPositionLabel": "サムネイルの表示位置（トリミング）:",
        "char.thumbTop": "上（顔を優先）",
        "char.thumbCenter": "真ん中（全体を優先）",
        "char.thumbBottom": "下（足元を優先）",
        "novel.pageTitle": "小説・ストーリー管理",
        "novel.worldLabel": " 世界線:",
        "novel.groupLabel": " 組織・ユニット:",
        "novel.charLabel": " キャラクター:",
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
        "novel.aiWriteBtn": "この話の本文をAIに執筆してもらう",
        "novel.theaterLabel": "本文執筆シアター:",
        "novel.outputPlaceholder": "ここに物語が紡がれます...",
        "novel.renameSeriesBtn": "シリーズ名を変更",
        "novel.renamePrompt": "新しいシリーズ名を入力してください：",
        "novel.overviewTitle": "最近のシリーズ",
        "novel.overviewEmpty": "まだシリーズがありません。キャラクターを選んで新作シリーズを作りましょう。",
        "novel.episodeUnit": "話",
        "novel.saved": "保存しました！",
        "novel.savedLocalOnly": "この端末に保存しました。ネットへの反映は上の「ネットに保存」を押してください。",
        "novel.saveBtn": "この話を保存する",
        "char.formFab": "入力",
        "char.formClose": "しまう",
        "char.fullscreenClose": "× 大画面表示を閉じる",
        "common.language": "言語",
        "birthday.congrats": "お誕生日おめでとうございます！",
        "js.editMode": "編集モード",
        "js.viewMode": "閲覧モード",
        "char.openDetailPage": "キャラクターを個別にみる",
        "char.backBtn": "← 戻る",
        "char.detailGalleryTitle": "ギャラリー",
        "char.detailGalleryEmpty": "まだギャラリー画像が登録されていません。",
        "char.galleryUploadLabel": "ギャラリー画像の登録（個別ページのスクロール先に表示されます）",
        "char.galleryTitlePlaceholder": "画像のタイトル（任意）",
        "char.addGalleryImageBtn": "ギャラリーに追加",
        "js.previewMode": "プレビュー中（閲覧者視点）",
        "js.previewAsVisitor": "閲覧者として見る",
        "js.backToEdit": "編集画面に戻る",
        "settings.title": "サイトの公開設定",
        "settings.pageVisibilityLabel": "あなたのページの公開範囲",
        "settings.public": "全体公開（スタートページの一覧に表示される）",
        "settings.unlisted": "限定公開（URLを知っている人だけが見られる。一覧には出ない）",
        "settings.saved": "設定を保存しました",
        "settings.saveFailed": "設定の保存に失敗しました",
        "portal.noCreatorsYet": "まだ登録されている作者はいません。ログインしてプロフィールを登録すると、ここに自動で表示されます！",
        "portal.needLoginToCreate": "ページの作成にはログインが必要です！",
        "portal.createPageFailed": "ページの作成に失敗しました。",
        "char.isPublicLabel": "このキャラクターを公開する（チェックを外すと自分にしか見えません。初期状態は非公開です）",
        "char.privateBadge": "非公開",
        "js.worldless": "世界線なし",
        "js.all": "全部",
        "js.detailOpen": "+ 詳細",
        "js.detailClose": "- 詳細",
        "js.edit": "編集",
        "js.delete": "削除",
        "js.favoriteOn": "★ お気に入り解除",
        "js.favoriteOff": "☆ お気に入り",
        "js.trashBtn": "ゴミ箱",
        "js.restoreBtn": "元に戻す",
        "js.permaDeleteBtn": "完全に削除",
        "js.unregisteredCreator": "未登録のクリエイター",
        "js.noBioYet": "自己紹介はまだありません。"
    },
    en: {
        "header.notLoggedIn": "Not logged in (view only)",
        "header.pleaseLogin": "Please log in",
        "header.publish": "Publish online",
        "header.googleLogin": "Sign in with Google",
        "header.myPage": "My page",
        "header.noMyPage": "You don't have a page yet. Create one with \"Create a new page\" on the start page.",
        "header.myPageFailed": "Couldn't open your page. Please try again.",
        "ai.notDeployed": "The AI function was not found on the server. Check that the site is deployed to Netlify together with its functions.",
        "ai.unknownError": "Couldn't get a response from the AI",
        "ai.errorPrefix": "A communication error occurred: ",
        "header.logout": "Log out",
        "header.switchAccount": "Switch account",
        "header.switchAccountFailed": "Failed to switch accounts.",
        "sidebar.title": "Menu",
        "sidebar.home": " Home / Gallery",
        "sidebar.characters": " Character Wiki",
        "sidebar.novel": " Stories",
        "portal.newsTitle": "\\ Site announcements /",
        "portal.newsLoading": "Loading announcements...",
        "portal.noNewsYet": "No announcements right now.",
        "portal.editNewsBtn": "Edit announcement (admin only)",
        "portal.editNewsTitle": "Edit announcement (admin mode)",
        "portal.newsPlaceholder": "Enter the announcement text...",
        "portal.saveNews": "Save announcement",
        "portal.newPagePrompt": "Ready to start a new page?",
        "portal.createPageBtn": "Create a new page",
        "portal.creatorListTitle": " Creators",
        "portal.creatorListHint": "Hover over a name to visit that creator's page!",
        "portal.adminLogin": " Admin login",
        "profile.editBtn": "Edit profile",
        "profile.nameLabel": "Display name",
        "profile.namePlaceholder": "Your display name",
        "profile.bioLabel": "Bio",
        "profile.bioPlaceholder": "Likes, dislikes, a note for close friends, etc.",
        "profile.snsLabel": "Main social links (optional)",
        "profile.extraLinksLabel": "Other links (add as many as you like)",
        "profile.linkNamePlaceholder": "Link name (e.g. My website)",
        "common.urlPlaceholder": "https://...",
        "common.addToList": "Add to list",
        "common.save": "Save",
        "common.cancel": "Cancel",
        "common.close": "Close",
        "common.search": "Search",
        "common.addLinkToList": "Add link to list",
        "common.addRelation": "Add relationship to list",
        "home.introText": "Characters, and the stories they weave — all gathered here. (WIP)",
        "home.galleryManageTitle": " Manage gallery images",
        "home.galleryManageDesc": "Add or remove the artwork that flows across the top of the home page.",
        "home.galleryTitlePlaceholder": "Image title (e.g. group art, full body)",
        "home.addImageBtn": "Add image",
        "home.registeredImagesLabel": " Registered images:",
        "char.pageTitle": "Character Manager",
        "char.advancedSearchBtn": "Advanced search (world / tags)",
        "char.randomPickBtn": "Random pick to draw",
        "char.worldSearchPlaceholder": "Search by world",
        "char.worldPickLabel": "Pick a world:",
        "char.tagPickLabel": "Pick a tag:",
        "trash.title": "Trash (auto-deleted permanently after 30 days)",
        "trash.empty": "The trash is empty.",
        "char.sortNew": "Newest first",
        "char.sortOld": "Oldest first",
        "char.sortName": "By name",
        "char.sortFavorite": "Favorites first",
        "char.fullscreenBtn": "Open form in fullscreen",
        "char.backupSaveBtn": "Save backup",
        "char.backupLoadBtn": "Load backup",
        "char.pasteImportTitle": "Paste-import from another site:",
        "char.pasteImportPlaceholder": "Paste (Ctrl+V) your data here",
        "char.parseImportBtn": "Parse and add to wiki",
        "char.jsonImportTitle": "Import data (JSON file) from another site:",
        "char.worldPlaceholder": "World",
        "char.groupPlaceholder": "Organization / unit (e.g. Assassins Guild, Police, Order of X)",
        "char.tagPlaceholder": "Tags (comma-separated)",
        "char.namePlaceholder": "Name",
        "char.furiganaPlaceholder": "Reading (optional, shown as small ruby text on the card)",
        "char.personalityPlaceholder": "Personality",
        "char.occupationPlaceholder": "Occupation",
        "char.labelWorld": "World:",
        "char.labelTag": "Tags:",
        "char.labelOccupation": "Occupation:",
        "char.labelPersonality": "Personality:",
        "char.labelBirthday": "Birthday:",
        "char.labelRelations": "Relationships:",
        "char.birthdayPlaceholder": "Birthday",
        "char.favColorLabel": "Theme color:",
        "char.linksLabel": "Add a related link",
        "char.linkTitlePlaceholder": "Link title",
        "char.themeVideoLabel": "Theme songs / videos (YouTube)",
        "char.addVideoBtn": "+ Add video URL",
        "char.memoLabel": "Notes (split into titled sections)",
        "char.addMemoBtn": "+ Add note section",
        "char.aiStoryBtn": "Have AI write a backstory",
        "char.relationsLabel": "Add a relationship",
        "char.relationTitlePlaceholder": "e.g. partner, rival, crush",
        "char.costumeLabel": "Register outfits / art (main and alt outfits go here)",
        "char.costumeNamePlaceholder": "Outfit name (e.g. main, school uniform, childhood)",
        "char.addCostumeBtn": "Add outfit to list",
        "char.submitBtn": "Add / Update",
        "char.thumbPositionLabel": "Thumbnail crop position:",
        "char.thumbTop": "Top (prioritize face)",
        "char.thumbCenter": "Center (prioritize whole image)",
        "char.thumbBottom": "Bottom (prioritize feet)",
        "novel.pageTitle": "Story Manager",
        "novel.worldLabel": " World:",
        "novel.groupLabel": " Organization:",
        "novel.charLabel": " Character:",
        "novel.seriesLabel": "Selected work (series):",
        "novel.newSeriesBtn": "+ New series",
        "novel.deleteSeriesBtn": "x Delete series",
        "novel.episodesLabel": "Episode list:",
        "novel.newEpisodeBtn": "+ Add episode",
        "novel.deleteEpisodeBtn": "x Delete this episode",
        "novel.subtitleLabel": "Subtitle / episode title:",
        "novel.episodeTitlePlaceholder": "e.g. Episode 1: A Rainy Afternoon",
        "novel.aiDesc": "Have AI write a story for this character and situation.",
        "novel.themePlaceholder": "What kind of scene?",
        "novel.aiWriteBtn": "Have AI write this episode",
        "novel.theaterLabel": "Writing theater:",
        "novel.outputPlaceholder": "Your story will appear here...",
        "novel.renameSeriesBtn": "Rename series",
        "novel.renamePrompt": "Enter the new series title:",
        "novel.overviewTitle": "Recent series",
        "novel.overviewEmpty": "No series yet. Pick a character and create a new series.",
        "novel.episodeUnit": "eps",
        "novel.saved": "Saved!",
        "novel.savedLocalOnly": "Saved on this device. Press \"Publish online\" at the top to sync it online.",
        "novel.saveBtn": "Save this episode",
        "char.formFab": "Form",
        "char.formClose": "Collapse",
        "char.fullscreenClose": "x Exit fullscreen",
        "common.language": "Language",
        "birthday.congrats": "Happy birthday!",
        "js.editMode": "Edit mode",
        "js.viewMode": "View only",
        "char.openDetailPage": "View character page",
        "char.backBtn": "← Back",
        "char.detailGalleryTitle": "Gallery",
        "char.detailGalleryEmpty": "No gallery images yet.",
        "char.galleryUploadLabel": "Add gallery images (shown when you scroll down the character page)",
        "char.galleryTitlePlaceholder": "Image title (optional)",
        "char.addGalleryImageBtn": "Add to gallery",
        "js.previewMode": "Previewing (visitor view)",
        "js.previewAsVisitor": "Preview as visitor",
        "js.backToEdit": "Back to editing",
        "settings.title": "Site visibility settings",
        "settings.pageVisibilityLabel": "Your page's visibility",
        "settings.public": "Public (listed on the start page)",
        "settings.unlisted": "Unlisted (only people with the link can view it; not listed)",
        "settings.saved": "Settings saved",
        "settings.saveFailed": "Failed to save settings",
        "portal.noCreatorsYet": "No creators registered yet. Log in and set up your profile to appear here automatically!",
        "portal.needLoginToCreate": "You need to log in to create a page!",
        "portal.createPageFailed": "Failed to create the page.",
        "char.isPublicLabel": "Make this character public (unchecked = only you can see it; private by default)",
        "char.privateBadge": "Private",
        "js.worldless": "No world set",
        "js.all": "All",
        "js.detailOpen": "+ Details",
        "js.detailClose": "- Details",
        "js.edit": "Edit",
        "js.delete": "Delete",
        "js.favoriteOn": "★ Unfavorite",
        "js.favoriteOff": "☆ Favorite",
        "js.trashBtn": "Trash",
        "js.restoreBtn": "Restore",
        "js.permaDeleteBtn": "Delete forever",
        "js.unregisteredCreator": "Unregistered creator",
        "js.noBioYet": "No bio yet."
    },
    "ko": {
        "header.notLoggedIn": "로그인하지 않음 (보기 전용)",
        "header.pleaseLogin": "로그인해 주세요",
        "header.publish": "온라인에 저장 (공개)",
        "header.googleLogin": "Google로 로그인",
        "header.myPage": "내 페이지",
        "header.noMyPage": "아직 페이지가 없습니다. 시작 페이지의 '새 페이지 만들기'에서 만들어 주세요.",
        "header.myPageFailed": "내 페이지를 열 수 없었습니다. 다시 시도해 주세요.",
        "ai.notDeployed": "서버에서 AI 함수를 찾을 수 없습니다. Netlify에 함수와 함께 배포되었는지 확인해 주세요.",
        "ai.unknownError": "AI에게서 응답을 받지 못했습니다",
        "ai.errorPrefix": "통신 오류가 발생했습니다: ",
        "header.logout": "로그아웃",
        "header.switchAccount": "계정 전환",
        "header.switchAccountFailed": "계정 전환에 실패했습니다.",
        "sidebar.title": "메뉴",
        "sidebar.home": " 홈 / 갤러리",
        "sidebar.characters": " 캐릭터 도감",
        "sidebar.novel": " 소설·스토리",
        "portal.newsTitle": "\\ 사이트 공지사항 /",
        "portal.newsLoading": "공지사항을 불러오는 중...",
        "portal.noNewsYet": "현재 공지사항이 없습니다.",
        "portal.editNewsBtn": "공지사항 편집 (관리자 전용)",
        "portal.editNewsTitle": "공지사항 편집 (관리자 모드)",
        "portal.newsPlaceholder": "공지사항 내용을 입력해주세요...",
        "portal.saveNews": "공지사항 저장",
        "portal.newPagePrompt": "새 페이지를 만들어 볼까요?",
        "portal.createPageBtn": "새 페이지 만들기",
        "portal.creatorListTitle": " 크리에이터 목록",
        "portal.creatorListHint": "이름에 마우스를 올리면 각 작가의 페이지로 이동할 수 있어요!",
        "portal.adminLogin": " 관리자 모드로 로그인",
        "profile.editBtn": "프로필 편집",
        "profile.nameLabel": "작가 이름",
        "profile.namePlaceholder": "작가 이름 (닉네임)",
        "profile.bioLabel": "자기소개",
        "profile.bioPlaceholder": "취향, 지뢰, 고정 멤버에게 하고 싶은 말 등",
        "profile.snsLabel": "주요 SNS (비워둬도 됩니다)",
        "profile.extraLinksLabel": "기타 외부 링크 (자유롭게 추가)",
        "profile.linkNamePlaceholder": "링크 이름 (예: 개인 사이트)",
        "common.urlPlaceholder": "https://...",
        "common.addToList": "목록에 추가",
        "common.save": "저장",
        "common.cancel": "취소",
        "common.close": "닫기",
        "common.search": "검색",
        "common.addLinkToList": "목록에 링크 추가",
        "common.addRelation": "목록에 관계 추가",
        "home.introText": "캐릭터와 그들이 만들어가는 이야기의 기록을 모두 여기에 모아두었습니다. (가제)",
        "home.galleryManageTitle": " 갤러리 이미지 관리",
        "home.galleryManageDesc": "홈 화면 상단에 흐르는 자랑스러운 그림을 추가·삭제할 수 있습니다.",
        "home.galleryTitlePlaceholder": "이미지 제목 (예: 단체 그림, 전신 그림 등)",
        "home.addImageBtn": "이미지 추가",
        "home.registeredImagesLabel": " 등록된 이미지 목록:",
        "char.pageTitle": "캐릭터 관리",
        "char.advancedSearchBtn": "상세 검색 (세계관·태그)",
        "char.randomPickBtn": "오늘 그릴 캐릭터",
        "char.worldSearchPlaceholder": "세계관으로 검색",
        "char.worldPickLabel": "세계관에서 선택:",
        "char.tagPickLabel": "태그에서 선택:",
        "trash.title": "휴지통 (30일간 보관 후 자동으로 완전히 삭제됩니다)",
        "trash.empty": "휴지통이 비어 있습니다.",
        "char.sortNew": "최신순",
        "char.sortOld": "오래된순",
        "char.sortName": "이름순",
        "char.sortFavorite": "즐겨찾기순",
        "char.fullscreenBtn": "입력 화면을 전체 화면으로 보기",
        "char.backupSaveBtn": "백업 저장",
        "char.backupLoadBtn": "백업 불러오기",
        "char.pasteImportTitle": "다른 사이트에서 붙여넣기로 가져오기:",
        "char.pasteImportPlaceholder": "여기에 데이터를 Ctrl+V로 붙여넣어 주세요",
        "char.parseImportBtn": "데이터를 분석해서 도감에 추가하기",
        "char.jsonImportTitle": "다른 사이트 데이터 (JSON 파일) 가져오기:",
        "char.worldPlaceholder": "세계관",
        "char.groupPlaceholder": "조직·유닛 (예: 암살 조직, 경찰, OO 기사단 등)",
        "char.tagPlaceholder": "태그 (쉼표로 구분)",
        "char.namePlaceholder": "이름",
        "char.furiganaPlaceholder": "읽는 법 (선택 사항, 카드에 작은 루비로 표시됩니다)",
        "char.personalityPlaceholder": "성격",
        "char.occupationPlaceholder": "직업",
        "char.labelWorld": "세계관:",
        "char.labelTag": "태그:",
        "char.labelOccupation": "직업:",
        "char.labelPersonality": "성격:",
        "char.labelBirthday": "생일:",
        "char.labelRelations": "관계:",
        "char.birthdayPlaceholder": "생일",
        "char.favColorLabel": "선호 색상:",
        "char.linksLabel": "관련 링크 추가",
        "char.linkTitlePlaceholder": "링크 제목 입력",
        "char.themeVideoLabel": "이미지송·테마 영상 (YouTube)",
        "char.addVideoBtn": "+ 영상 URL 추가",
        "char.memoLabel": "메모·상세 설정 (제목별로 나눌 수 있습니다)",
        "char.addMemoBtn": "+ 새 메모 칸 추가",
        "char.aiStoryBtn": "AI에게 배경 스토리 집필 요청하기",
        "char.relationsLabel": "관계 추가",
        "char.relationTitlePlaceholder": "예: 파트너, 라이벌, 짝사랑",
        "char.costumeLabel": "의상·일러스트 등록 (메인도 다른 의상도 여기서!)",
        "char.costumeNamePlaceholder": "의상 이름 (예: 메인, 교복, 어린 시절)",
        "char.addCostumeBtn": "의상을 목록에 추가",
        "char.submitBtn": "추가·업데이트",
        "char.thumbPositionLabel": "썸네일 표시 위치 (자르기):",
        "char.thumbTop": "위쪽 (얼굴 우선)",
        "char.thumbCenter": "가운데 (전체 우선)",
        "char.thumbBottom": "아래쪽 (발 우선)",
        "novel.pageTitle": "소설·스토리 관리",
        "novel.worldLabel": " 세계관:",
        "novel.groupLabel": " 조직·유닛:",
        "novel.charLabel": " 캐릭터:",
        "novel.seriesLabel": "선택한 작품 (시리즈):",
        "novel.newSeriesBtn": "+ 새 시리즈 만들기",
        "novel.deleteSeriesBtn": "× 시리즈 삭제",
        "novel.episodesLabel": "에피소드 (화수) 목록:",
        "novel.newEpisodeBtn": "+ 새 에피소드 추가",
        "novel.deleteEpisodeBtn": "× 이 에피소드 삭제",
        "novel.subtitleLabel": "부제 / 에피소드 제목:",
        "novel.episodeTitlePlaceholder": "예: 제1화 비 오는 날의 방과 후",
        "novel.aiDesc": "이 캐릭터·상황에 맞는 소설을 AI가 집필하게 합니다.",
        "novel.themePlaceholder": "어떤 상황으로 할까요?",
        "novel.aiWriteBtn": "이 에피소드 본문을 AI에게 집필 요청하기",
        "novel.theaterLabel": "본문 집필 극장:",
        "novel.outputPlaceholder": "여기에 이야기가 펼쳐집니다...",
        "novel.renameSeriesBtn": "시리즈 이름 변경",
        "novel.renamePrompt": "새 시리즈 이름을 입력해 주세요:",
        "novel.overviewTitle": "최근 시리즈",
        "novel.overviewEmpty": "아직 시리즈가 없습니다. 캐릭터를 선택해 새 시리즈를 만들어 보세요.",
        "novel.episodeUnit": "화",
        "novel.saved": "저장했습니다!",
        "novel.savedLocalOnly": "이 기기에 저장했습니다. 온라인 반영은 위의 '온라인에 저장'을 눌러 주세요.",
        "novel.saveBtn": "이 에피소드 저장",
        "char.formFab": "입력",
        "char.formClose": "접기",
        "char.fullscreenClose": "× 전체 화면 닫기",
        "common.language": "언어",
        "birthday.congrats": "생일 축하합니다!",
        "js.editMode": "편집 모드",
        "js.viewMode": "보기 전용",
        "char.openDetailPage": "캐릭터 개별 페이지 보기",
        "char.backBtn": "← 뒤로",
        "char.detailGalleryTitle": "갤러리",
        "char.detailGalleryEmpty": "아직 등록된 갤러리 이미지가 없습니다.",
        "char.galleryUploadLabel": "갤러리 이미지 등록 (개별 페이지를 아래로 스크롤하면 표시됩니다)",
        "char.galleryTitlePlaceholder": "이미지 제목 (선택 사항)",
        "char.addGalleryImageBtn": "갤러리에 추가",
        "js.previewMode": "미리보기 중 (방문자 화면)",
        "js.previewAsVisitor": "방문자 화면으로 보기",
        "js.backToEdit": "편집 화면으로 돌아가기",
        "settings.title": "사이트 공개 설정",
        "settings.pageVisibilityLabel": "내 페이지의 공개 범위",
        "settings.public": "전체 공개 (홈 화면 목록에 표시됨)",
        "settings.unlisted": "제한 공개 (링크를 아는 사람만 볼 수 있으며, 목록에는 표시되지 않음)",
        "settings.saved": "설정을 저장했습니다",
        "settings.saveFailed": "설정 저장에 실패했습니다",
        "portal.noCreatorsYet": "아직 등록된 작가가 없습니다. 로그인해서 프로필을 등록하면 여기에 자동으로 표시됩니다!",
        "portal.needLoginToCreate": "페이지를 만들려면 로그인이 필요합니다!",
        "portal.createPageFailed": "페이지 생성에 실패했습니다.",
        "char.isPublicLabel": "이 캐릭터를 공개합니다 (체크 해제 시 나만 볼 수 있음. 기본값은 비공개)",
        "char.privateBadge": "비공개",
        "js.worldless": "세계관 없음",
        "js.all": "전체",
        "js.detailOpen": "+ 상세",
        "js.detailClose": "- 상세",
        "js.edit": "편집",
        "js.delete": "삭제",
        "js.favoriteOn": "★ 즐겨찾기 해제",
        "js.favoriteOff": "☆ 즐겨찾기",
        "js.trashBtn": "휴지통",
        "js.restoreBtn": "복원",
        "js.permaDeleteBtn": "완전히 삭제",
        "js.unregisteredCreator": "미등록 크리에이터",
        "js.noBioYet": "아직 자기소개가 없습니다.",
    },
    "zh-Hans": {
        "header.notLoggedIn": "未登录（仅浏览）",
        "header.pleaseLogin": "请登录",
        "header.publish": "保存到网上（公开）",
        "header.googleLogin": "使用 Google 登录",
        "header.myPage": "我的页面",
        "header.noMyPage": "你还没有页面。请在首页点击“创建新页面”来创建。",
        "header.myPageFailed": "无法打开你的页面，请重试。",
        "ai.notDeployed": "服务器上找不到 AI 函数。请确认网站是否连同函数一起部署到了 Netlify。",
        "ai.unknownError": "未能收到 AI 的回应",
        "ai.errorPrefix": "发生通信错误：",
        "header.logout": "退出登录",
        "header.switchAccount": "切换账号",
        "header.switchAccountFailed": "切换账号失败。",
        "sidebar.title": "菜单",
        "sidebar.home": " 首页 / 图库",
        "sidebar.characters": " 角色图鉴",
        "sidebar.novel": " 小说·故事",
        "portal.newsTitle": "\\ 本站公告 /",
        "portal.newsLoading": "正在加载公告...",
        "portal.noNewsYet": "目前没有公告。",
        "portal.editNewsBtn": "编辑公告（仅限管理员）",
        "portal.editNewsTitle": "编辑公告（管理员模式）",
        "portal.newsPlaceholder": "请输入公告内容...",
        "portal.saveNews": "保存公告",
        "portal.newPagePrompt": "要开始创建新页面吗？",
        "portal.createPageBtn": "创建新页面",
        "portal.creatorListTitle": " 创作者列表",
        "portal.creatorListHint": "将鼠标悬停在名字上，即可前往该作者的主页！",
        "portal.adminLogin": " 以管理员模式登录",
        "profile.editBtn": "编辑资料",
        "profile.nameLabel": "作者名",
        "profile.namePlaceholder": "作者名（昵称）",
        "profile.bioLabel": "自我介绍",
        "profile.bioPlaceholder": "喜好、雷点、对固定成员的话等",
        "profile.snsLabel": "主要社交账号（可留空）",
        "profile.extraLinksLabel": "其他外部链接（可自由添加）",
        "profile.linkNamePlaceholder": "链接名称（例：个人网站）",
        "common.urlPlaceholder": "https://...",
        "common.addToList": "添加到列表",
        "common.save": "保存",
        "common.cancel": "取消",
        "common.close": "关闭",
        "common.search": "搜索",
        "common.addLinkToList": "将链接添加到列表",
        "common.addRelation": "将关系添加到列表",
        "home.introText": "角色，以及他们所编织的故事记录，全部汇总在这里。（暂定）",
        "home.galleryManageTitle": " 图库图片管理",
        "home.galleryManageDesc": "可以添加或删除在首页顶部滚动展示的得意插画。",
        "home.galleryTitlePlaceholder": "图片标题（例：集合绘、立绘等）",
        "home.addImageBtn": "添加图片",
        "home.registeredImagesLabel": " 已登记图片列表：",
        "char.pageTitle": "角色管理",
        "char.advancedSearchBtn": "高级搜索（世界观·标签）",
        "char.randomPickBtn": "今日绘制角色",
        "char.worldSearchPlaceholder": "按世界观搜索",
        "char.worldPickLabel": "从世界观中选择：",
        "char.tagPickLabel": "从标签中选择：",
        "trash.title": "回收站（保存30天后将自动彻底删除）",
        "trash.empty": "回收站是空的。",
        "char.sortNew": "最新排序",
        "char.sortOld": "最早排序",
        "char.sortName": "按名称排序",
        "char.sortFavorite": "按收藏排序",
        "char.fullscreenBtn": "以全屏方式显示输入界面",
        "char.backupSaveBtn": "保存备份",
        "char.backupLoadBtn": "读取备份",
        "char.pasteImportTitle": "从其他网站粘贴导入：",
        "char.pasteImportPlaceholder": "请在此处粘贴（Ctrl+V）数据",
        "char.parseImportBtn": "解析数据并添加到图鉴",
        "char.jsonImportTitle": "导入其他网站的数据（JSON 文件）：",
        "char.worldPlaceholder": "世界观",
        "char.groupPlaceholder": "组织·团体（例：暗杀组织、警察、○○骑士团等）",
        "char.tagPlaceholder": "标签（用逗号分隔）",
        "char.namePlaceholder": "名字",
        "char.furiganaPlaceholder": "读音（可选，会在卡片上以小字标注）",
        "char.personalityPlaceholder": "性格",
        "char.occupationPlaceholder": "职业",
        "char.labelWorld": "世界观：",
        "char.labelTag": "标签：",
        "char.labelOccupation": "职业：",
        "char.labelPersonality": "性格：",
        "char.labelBirthday": "生日：",
        "char.labelRelations": "关系：",
        "char.birthdayPlaceholder": "生日",
        "char.favColorLabel": "代表色：",
        "char.linksLabel": "添加相关链接",
        "char.linkTitlePlaceholder": "输入链接标题",
        "char.themeVideoLabel": "角色歌·主题视频（YouTube）",
        "char.addVideoBtn": "＋ 添加视频链接",
        "char.memoLabel": "备注·详细设置（可按标题分类）",
        "char.addMemoBtn": "＋ 添加新的备注栏",
        "char.aiStoryBtn": "请 AI 撰写背景故事",
        "char.relationsLabel": "添加关系",
        "char.relationTitlePlaceholder": "例：搭档、对手、单恋对象",
        "char.costumeLabel": "登记服装·立绘（主图和其他服装都在这里添加！）",
        "char.costumeNamePlaceholder": "服装名称（例：主图、校服、幼年时期）",
        "char.addCostumeBtn": "将服装添加到列表",
        "char.submitBtn": "添加・更新",
        "char.thumbPositionLabel": "缩略图显示位置（裁剪）：",
        "char.thumbTop": "顶部（优先显示脸部）",
        "char.thumbCenter": "居中（优先显示整体）",
        "char.thumbBottom": "底部（优先显示脚部）",
        "novel.pageTitle": "小说·故事管理",
        "novel.worldLabel": " 世界观：",
        "novel.groupLabel": " 组织·团体：",
        "novel.charLabel": " 角色：",
        "novel.seriesLabel": "当前选择的作品（系列）：",
        "novel.newSeriesBtn": "＋ 创建新系列",
        "novel.deleteSeriesBtn": "× 删除系列",
        "novel.episodesLabel": "章节列表：",
        "novel.newEpisodeBtn": "＋ 添加新章节",
        "novel.deleteEpisodeBtn": "× 删除此章节",
        "novel.subtitleLabel": "副标题 / 章节标题：",
        "novel.episodeTitlePlaceholder": "例：第1话 雨天的放学后",
        "novel.aiDesc": "让 AI 根据这个角色·情境撰写小说。",
        "novel.themePlaceholder": "想设定什么样的情境？",
        "novel.aiWriteBtn": "请 AI 撰写本章正文",
        "novel.theaterLabel": "正文创作剧场：",
        "novel.outputPlaceholder": "故事将在这里展开...",
        "novel.renameSeriesBtn": "修改系列名称",
        "novel.renamePrompt": "请输入新的系列名称：",
        "novel.overviewTitle": "最近的系列",
        "novel.overviewEmpty": "还没有系列。请选择角色并创建新系列。",
        "novel.episodeUnit": "话",
        "novel.saved": "已保存！",
        "novel.savedLocalOnly": "已保存在本设备。要同步到网上，请点击上方的“保存到网上”。",
        "novel.saveBtn": "保存本章",
        "char.formFab": "录入",
        "char.formClose": "收起",
        "char.fullscreenClose": "× 关闭全屏显示",
        "common.language": "语言",
        "birthday.congrats": "生日快乐！",
        "js.editMode": "编辑模式",
        "js.viewMode": "仅浏览",
        "char.openDetailPage": "查看角色独立页面",
        "char.backBtn": "← 返回",
        "char.detailGalleryTitle": "图库",
        "char.detailGalleryEmpty": "还没有登记图库图片。",
        "char.galleryUploadLabel": "添加图库图片（向下滚动角色页面即可看到）",
        "char.galleryTitlePlaceholder": "图片标题（可选）",
        "char.addGalleryImageBtn": "添加到图库",
        "js.previewMode": "预览中（访客视角）",
        "js.previewAsVisitor": "以访客视角预览",
        "js.backToEdit": "返回编辑画面",
        "settings.title": "网站公开设置",
        "settings.pageVisibilityLabel": "你的页面的公开范围",
        "settings.public": "全体公开（会显示在首页列表中）",
        "settings.unlisted": "仅限链接访问（只有知道链接的人能看到，不会出现在列表中）",
        "settings.saved": "设置已保存",
        "settings.saveFailed": "设置保存失败",
        "portal.noCreatorsYet": "目前还没有已注册的作者。登录并设置资料后，会自动显示在这里！",
        "portal.needLoginToCreate": "创建页面需要先登录！",
        "portal.createPageFailed": "页面创建失败。",
        "char.isPublicLabel": "公开这个角色（取消勾选则只有自己能看到。默认是不公开）",
        "char.privateBadge": "未公开",
        "js.worldless": "无世界观",
        "js.all": "全部",
        "js.detailOpen": "+ 详情",
        "js.detailClose": "- 详情",
        "js.edit": "编辑",
        "js.delete": "删除",
        "js.favoriteOn": "★ 取消收藏",
        "js.favoriteOff": "☆ 收藏",
        "js.trashBtn": "回收站",
        "js.restoreBtn": "恢复",
        "js.permaDeleteBtn": "彻底删除",
        "js.unregisteredCreator": "未注册的创作者",
        "js.noBioYet": "暂无自我介绍。",
    },
    "zh-Hant": {
        "header.notLoggedIn": "未登入（僅瀏覽）",
        "header.pleaseLogin": "請登入",
        "header.publish": "儲存到網路上（公開）",
        "header.googleLogin": "使用 Google 登入",
        "header.myPage": "我的頁面",
        "header.noMyPage": "你還沒有頁面。請在首頁點擊「建立新頁面」來建立。",
        "header.myPageFailed": "無法開啟你的頁面，請重試。",
        "ai.notDeployed": "伺服器上找不到 AI 函式。請確認網站是否連同函式一起部署到了 Netlify。",
        "ai.unknownError": "未能收到 AI 的回應",
        "ai.errorPrefix": "發生通訊錯誤：",
        "header.logout": "登出",
        "header.switchAccount": "切換帳號",
        "header.switchAccountFailed": "切換帳號失敗。",
        "sidebar.title": "選單",
        "sidebar.home": " 首頁 / 圖庫",
        "sidebar.characters": " 角色圖鑑",
        "sidebar.novel": " 小說·故事",
        "portal.newsTitle": "\\ 本站公告 /",
        "portal.newsLoading": "正在載入公告...",
        "portal.noNewsYet": "目前沒有公告。",
        "portal.editNewsBtn": "編輯公告（僅限管理員）",
        "portal.editNewsTitle": "編輯公告（管理員模式）",
        "portal.newsPlaceholder": "請輸入公告內容...",
        "portal.saveNews": "儲存公告",
        "portal.newPagePrompt": "要開始建立新頁面嗎？",
        "portal.createPageBtn": "建立新頁面",
        "portal.creatorListTitle": " 創作者列表",
        "portal.creatorListHint": "將滑鼠移到名字上，即可前往該作者的頁面！",
        "portal.adminLogin": " 以管理員模式登入",
        "profile.editBtn": "編輯個人資料",
        "profile.nameLabel": "作者名稱",
        "profile.namePlaceholder": "作者名稱（暱稱）",
        "profile.bioLabel": "自我介紹",
        "profile.bioPlaceholder": "喜好、雷點、給固定成員的話等",
        "profile.snsLabel": "主要社群連結（可留空）",
        "profile.extraLinksLabel": "其他外部連結（可自由新增）",
        "profile.linkNamePlaceholder": "連結名稱（例：個人網站）",
        "common.urlPlaceholder": "https://...",
        "common.addToList": "新增到清單",
        "common.save": "儲存",
        "common.cancel": "取消",
        "common.close": "關閉",
        "common.search": "搜尋",
        "common.addLinkToList": "將連結新增到清單",
        "common.addRelation": "將關係新增到清單",
        "home.introText": "角色，以及他們所編織的故事紀錄，全部彙整在這裡。（暫定）",
        "home.galleryManageTitle": " 圖庫圖片管理",
        "home.galleryManageDesc": "可以新增或刪除在首頁頂端輪播的得意插畫。",
        "home.galleryTitlePlaceholder": "圖片標題（例：合圖、全身立繪等）",
        "home.addImageBtn": "新增圖片",
        "home.registeredImagesLabel": " 已登錄圖片清單：",
        "char.pageTitle": "角色管理",
        "char.advancedSearchBtn": "進階搜尋（世界觀·標籤）",
        "char.randomPickBtn": "今日繪製角色",
        "char.worldSearchPlaceholder": "以世界觀搜尋",
        "char.worldPickLabel": "從世界觀選擇：",
        "char.tagPickLabel": "從標籤選擇：",
        "trash.title": "垃圾桶（保存30天後將自動永久刪除）",
        "trash.empty": "垃圾桶是空的。",
        "char.sortNew": "最新排序",
        "char.sortOld": "最舊排序",
        "char.sortName": "依名稱排序",
        "char.sortFavorite": "依收藏排序",
        "char.fullscreenBtn": "以全螢幕顯示輸入畫面",
        "char.backupSaveBtn": "儲存備份",
        "char.backupLoadBtn": "讀取備份",
        "char.pasteImportTitle": "從其他網站貼上匯入：",
        "char.pasteImportPlaceholder": "請在此貼上（Ctrl+V）資料",
        "char.parseImportBtn": "解析資料並加入圖鑑",
        "char.jsonImportTitle": "匯入其他網站的資料（JSON 檔案）：",
        "char.worldPlaceholder": "世界觀",
        "char.groupPlaceholder": "組織·團體（例：暗殺組織、警察、○○騎士團等）",
        "char.tagPlaceholder": "標籤（以逗號分隔）",
        "char.namePlaceholder": "名字",
        "char.furiganaPlaceholder": "讀音（選填，會在卡片上以小字標註）",
        "char.personalityPlaceholder": "性格",
        "char.occupationPlaceholder": "職業",
        "char.labelWorld": "世界觀：",
        "char.labelTag": "標籤：",
        "char.labelOccupation": "職業：",
        "char.labelPersonality": "性格：",
        "char.labelBirthday": "生日：",
        "char.labelRelations": "關係：",
        "char.birthdayPlaceholder": "生日",
        "char.favColorLabel": "代表色：",
        "char.linksLabel": "新增相關連結",
        "char.linkTitlePlaceholder": "輸入連結標題",
        "char.themeVideoLabel": "角色歌·主題影片（YouTube）",
        "char.addVideoBtn": "＋ 新增影片連結",
        "char.memoLabel": "備註·詳細設定（可依標題分類）",
        "char.addMemoBtn": "＋ 新增備註欄",
        "char.aiStoryBtn": "請 AI 撰寫背景故事",
        "char.relationsLabel": "新增關係",
        "char.relationTitlePlaceholder": "例：搭檔、對手、單戀對象",
        "char.costumeLabel": "登錄服裝·立繪（主圖和其他服裝都從這裡新增！）",
        "char.costumeNamePlaceholder": "服裝名稱（例：主圖、校服、幼年時期）",
        "char.addCostumeBtn": "將服裝新增到清單",
        "char.submitBtn": "新增・更新",
        "char.thumbPositionLabel": "縮圖顯示位置（裁切）：",
        "char.thumbTop": "上方（優先顯示臉部）",
        "char.thumbCenter": "置中（優先顯示整體）",
        "char.thumbBottom": "下方（優先顯示腳部）",
        "novel.pageTitle": "小說·故事管理",
        "novel.worldLabel": " 世界觀：",
        "novel.groupLabel": " 組織·團體：",
        "novel.charLabel": " 角色：",
        "novel.seriesLabel": "目前選擇的作品（系列）：",
        "novel.newSeriesBtn": "＋ 建立新系列",
        "novel.deleteSeriesBtn": "× 刪除系列",
        "novel.episodesLabel": "章節清單：",
        "novel.newEpisodeBtn": "＋ 新增章節",
        "novel.deleteEpisodeBtn": "× 刪除此章節",
        "novel.subtitleLabel": "副標題 / 章節標題：",
        "novel.episodeTitlePlaceholder": "例：第1話 雨天的放學後",
        "novel.aiDesc": "讓 AI 根據這個角色·情境撰寫小說。",
        "novel.themePlaceholder": "想設定什麼樣的情境？",
        "novel.aiWriteBtn": "請 AI 撰寫本話正文",
        "novel.theaterLabel": "正文創作劇場：",
        "novel.outputPlaceholder": "故事將在這裡展開...",
        "novel.renameSeriesBtn": "修改系列名稱",
        "novel.renamePrompt": "請輸入新的系列名稱：",
        "novel.overviewTitle": "最近的系列",
        "novel.overviewEmpty": "還沒有系列。請選擇角色並建立新系列。",
        "novel.episodeUnit": "話",
        "novel.saved": "已儲存！",
        "novel.savedLocalOnly": "已儲存在本裝置。要同步到網路上，請按上方的「儲存到網路上」。",
        "novel.saveBtn": "儲存本話",
        "char.formFab": "輸入",
        "char.formClose": "收起",
        "char.fullscreenClose": "× 關閉全螢幕顯示",
        "common.language": "語言",
        "birthday.congrats": "生日快樂！",
        "js.editMode": "編輯模式",
        "js.viewMode": "僅瀏覽",
        "char.openDetailPage": "查看角色獨立頁面",
        "char.backBtn": "← 返回",
        "char.detailGalleryTitle": "圖庫",
        "char.detailGalleryEmpty": "尚未登錄圖庫圖片。",
        "char.galleryUploadLabel": "新增圖庫圖片（向下捲動角色頁面即可看到）",
        "char.galleryTitlePlaceholder": "圖片標題（選填）",
        "char.addGalleryImageBtn": "新增到圖庫",
        "js.previewMode": "預覽中（訪客視角）",
        "js.previewAsVisitor": "以訪客視角預覽",
        "js.backToEdit": "返回編輯畫面",
        "settings.title": "網站公開設定",
        "settings.pageVisibilityLabel": "你的頁面的公開範圍",
        "settings.public": "全體公開（會顯示在首頁清單中）",
        "settings.unlisted": "僅限連結訪問（只有知道連結的人能看到，不會出現在清單中）",
        "settings.saved": "設定已儲存",
        "settings.saveFailed": "設定儲存失敗",
        "portal.noCreatorsYet": "目前還沒有已登錄的作者。登入並設定個人資料後，會自動顯示在這裡！",
        "portal.needLoginToCreate": "建立頁面需要先登入！",
        "portal.createPageFailed": "頁面建立失敗。",
        "char.isPublicLabel": "公開這個角色（取消勾選則只有自己能看到。預設為不公開）",
        "char.privateBadge": "未公開",
        "js.worldless": "無世界觀",
        "js.all": "全部",
        "js.detailOpen": "+ 詳細",
        "js.detailClose": "- 詳細",
        "js.edit": "編輯",
        "js.delete": "刪除",
        "js.favoriteOn": "★ 取消收藏",
        "js.favoriteOff": "☆ 收藏",
        "js.trashBtn": "垃圾桶",
        "js.restoreBtn": "還原",
        "js.permaDeleteBtn": "永久刪除",
        "js.unregisteredCreator": "未登錄的創作者",
        "js.noBioYet": "尚無自我介紹。",
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

    const fsBtn = document.getElementById("fullscreen-toggle-btn");
    const formEl = document.getElementById("charFormPanel");
    if (fsBtn && formEl && formEl.classList.contains("fullscreen-mode")) {
        fsBtn.textContent = t("char.fullscreenClose");
    }
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
    loadSavedThemeConfig();
}

function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateThemeToggleIcon(next);
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

let themeConfig = {
    preset: "light",
    bgImageUrl: ""
};

function loadSavedThemeConfig() {
    const saved = localStorage.getItem("theme_config");
    if (saved) {
        try {
            themeConfig = JSON.parse(saved);
            applyThemeConfigUI(themeConfig);
        } catch (e) {}
    }
}

function openThemeModal() {
    const modal = document.getElementById("themeCustomizeModal");
    if (modal) {
        document.getElementById("themeBgImageUrl").value = themeConfig.bgImageUrl || "";
        modal.style.display = "flex";
    }
}
window.openThemeModal = openThemeModal;

function closeThemeModal() {
    const modal = document.getElementById("themeCustomizeModal");
    if (modal) modal.style.display = "none";
}
window.closeThemeModal = closeThemeModal;

function applyPresetTheme(preset) {
    themeConfig.preset = preset;
    const body = document.getElementById("app-body");
    if (!body) return;

    if (preset === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        body.style.background = "linear-gradient(135deg, #f4f6ff 0%, #fff0f7 50%, #f6f3ff 100%)";
    } else if (preset === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        body.style.background = "linear-gradient(135deg, #0b0f19 0%, #15102a 50%, #0d1322 100%)";
    } else if (preset === "fantasy") {
        document.documentElement.setAttribute("data-theme", "light");
        body.style.background = "linear-gradient(135deg, #fef3c7 0%, #fffbeb 50%, #fde68a 100%)";
    } else if (preset === "cyber") {
        document.documentElement.setAttribute("data-theme", "dark");
        body.style.background = "linear-gradient(135deg, #020617 0%, #0f172a 50%, #164e63 100%)";
    } else if (preset === "gothic") {
        document.documentElement.setAttribute("data-theme", "dark");
        body.style.background = "linear-gradient(135deg, #18052e 0%, #2e1065 50%, #090014 100%)";
    }
}
window.applyPresetTheme = applyPresetTheme;

function saveThemeSettings() {
    const imgUrl = document.getElementById("themeBgImageUrl").value.trim();
    themeConfig.bgImageUrl = imgUrl;
    applyThemeConfigUI(themeConfig);
    localStorage.setItem("theme_config", JSON.stringify(themeConfig));
    closeThemeModal();
}
window.saveThemeSettings = saveThemeSettings;

function applyThemeConfigUI(cfg) {
    const layer = document.getElementById("custom-bg-layer");
    if (layer) {
        if (cfg.bgImageUrl) {
            layer.style.backgroundImage = `url('${cfg.bgImageUrl}')`;
            layer.style.opacity = "0.3";
        } else {
            layer.style.backgroundImage = "none";
        }
    }
    if (cfg.preset) applyPresetTheme(cfg.preset);
}

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

    alert("送信しました！メッセージは作者に届けられます。");
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
// なでなで機能
// =========================================
let isPatPatMode = false;
let patpatCount = 0;

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
        if (img) {
            img.draggable = false;
        }
        showPatpatSpeech("頭や体をなでてみてね (*'ω'*)");
    } else {
        if (btn) {
            btn.classList.remove("active");
            btn.textContent = "なでなでモード";
        }
        if (target) target.classList.remove("patpat-active");
        const bubble = document.getElementById("patpatSpeechBubble");
        if (bubble) bubble.style.display = "none";
    }
}
window.togglePatPatMode = togglePatPatMode;

function handleMainArtClick(e) {
    e.preventDefault();
    if (!isPatPatMode) {
        openModal(e.target.src);
        return;
    }
    patCharacter(e.clientX, e.clientY);
}

function patCharacter(clientX, clientY) {
    patpatCount++;
    const countEl = document.getElementById("patpatCountText");
    if (countEl) countEl.textContent = patpatCount;

    createPatParticle(clientX, clientY);
    triggerPatReaction();
}

//なでなで表示 パーティクル
const PAT_SYMBOLS = ["(仮)"];

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

const PAT_SPEECHES = [
    "(仮)"
];

function triggerPatReaction() {
    const c = characters.find(ch => ch.id === detailCharId);
    let speech = PAT_SPEECHES[Math.floor(Math.random() * PAT_SPEECHES.length)];

    if (c && c.name) {
        if (c.personality && c.personality.includes("ツンデレ")) {
            speech = `「(仮)」`;
        } else if (c.personality && (c.personality.includes("クーデレ") || c.personality.includes("クール"))) {
            speech = `「(仮)」`;
        }
    }

    showPatpatSpeech(speech);

    if (c && c.images && c.images[detailArtIndex] && c.images[detailArtIndex].expressions && c.images[detailArtIndex].expressions.length > 0) {
        const happyExp = c.images[detailArtIndex].expressions[0];
        const mainImg = document.getElementById("charDetailMainImg");
        if (mainImg) {
            const originalSrc = mainImg.src;
            mainImg.src = happyExp.url;
            setTimeout(() => {
                if (mainImg.src === happyExp.url) mainImg.src = originalSrc;
            }, 1200);
        }
    }
}

function showPatpatSpeech(text) {
    const bubble = document.getElementById("patpatSpeechBubble");
    if (!bubble) return;
    bubble.textContent = text;
    bubble.style.display = "block";
}

// =========================================
// 世界観・用語事典（Lore Book）
// =========================================
let worldLore = [];
let currentLoreCat = "";
let selectedLoreId = null;
let editLoreId = null;
let tempLoreImageBase64 = null;

function loadLoreData() {
    const local = localStorage.getItem("world_lore");
    if (local) {
        try { 
            worldLore = JSON.parse(local); 
            localStorage.setItem("world_lore", JSON.stringify(worldLore));
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

    const categories = ["全部", ...new Set(worldLore.map(l => l.category || "用語").filter(Boolean))];
    if (catContainer) {
        catContainer.innerHTML = categories.map(cat => `
            <button class="lore-cat-btn ${(currentLoreCat === cat || (!currentLoreCat && cat === '全部')) ? 'active' : ''}" onclick="filterLoreCat('${cat === '全部' ? '' : cat}')">${cat}</button>
        `).join("");
    }

    const filtered = worldLore.filter(l => {
        const matchCat = !currentLoreCat || l.category === currentLoreCat;
        const matchSearch = !searchVal || (l.title && l.title.toLowerCase().includes(searchVal)) || (l.content && l.content.toLowerCase().includes(searchVal));
        return matchCat && matchSearch;
    });

    if (listContainer) {
        if (filtered.length === 0) {
            listContainer.innerHTML = `<p style="font-size:12px; color:rgba(139,90,43,0.7); padding:14px; text-align:center;">まだ用語や設定がありません。<br>右上の「＋ 新規登録」から追加できます！</p>`;
        } else {
            listContainer.innerHTML = filtered.map(l => `
                <div class="lore-index-item ${String(selectedLoreId) === String(l.id) ? 'active' : ''}" onclick="selectLoreItem(${l.id})" style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="flex:1; overflow:hidden;">
                        <div style="font-size:13px; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHTML(l.title)}</div>
                        <div style="font-size:11px; opacity:0.75;">${escapeHTML(l.world || "共通")} / ${escapeHTML(l.category || "用語")}</div>
                    </div>
                    <button type="button" onclick="deleteLoreById(${l.id}, event)" title="削除" style="background:none; border:none; color:var(--danger); cursor:pointer; font-size:13px; padding:2px 6px;">✕</button>
                </div>
            `).join("");
        }
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
    editLoreId = id;
    const modal = document.getElementById("loreEditorModal");
    const title = document.getElementById("loreEditorModalTitle");
    if (!modal) return;

    tempLoreImageBase64 = null;
    const preview = document.getElementById("loreEditImagePreview");
    if (preview) preview.innerHTML = "";

    // 登録キャラの世界線・タグからサジェストとクイック候補ボタンを自動生成
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
                tempLoreImageBase64 = await compressImage(e.target.files[0], 1000);
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

    localStorage.setItem("world_lore", JSON.stringify(worldLore));
    closeLoreEditor();
    selectLoreItem(entry.id);
    renderLoreEntries();
}
window.saveLoreEntry = saveLoreEntry;

function editCurrentLore() {
    if (selectedLoreId) openLoreEditor(selectedLoreId);
}
window.editCurrentLore = editCurrentLore;

function deleteCurrentLore() {
    if (!selectedLoreId && selectedLoreId !== 0) return;
    if (!confirm("この項目を事典から削除しますか？")) return;
    worldLore = worldLore.filter(l => String(l.id) !== String(selectedLoreId));
    localStorage.setItem("world_lore", JSON.stringify(worldLore));
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
    if (!confirm("この項目を事典から削除しますか？")) return;
    worldLore = worldLore.filter(l => String(l.id) !== String(id));
    localStorage.setItem("world_lore", JSON.stringify(worldLore));
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
            const thumb = (c.images && c.images[0] && c.images[0].url) || "";
            return `
                <div class="suggest-item" onclick="jumpToCharacterCard(${c.id})">
                    ${thumb ? `<img src="${thumb}" class="suggest-thumb">` : `<div class="suggest-thumb" style="display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--text-muted);">[IMG]</div>`}
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
        alert(`ログインに成功したよ！ようこそ、${result.user.displayName}さん！`);
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
        console.error("マイページを開けませんでした:", error);
        alert(t("header.myPageFailed"));
    }
}
window.goToMyPage = goToMyPage;

function switchGoogleAccount() {
    provider.setCustomParameters({ prompt: "select_account" });
    auth.signInWithPopup(provider).catch((error) => {
        if (error.code !== "auth/cancelled-popup-request" && error.code !== "auth/popup-closed-by-user") {
            alert(t("header.switchAccountFailed"));
        }
    });
}
window.switchGoogleAccount = switchGoogleAccount;

function logout() {
    auth.signOut().then(() => {
        alert("ログアウトしたよ！またね！");
    }).catch((error) => {
        console.error("ログアウトエラー:", error);
    });
}
window.logout = logout;

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

    let globalStyle = document.getElementById("global-custom-css");
    if (!globalStyle) {
        globalStyle = document.createElement("style");
        globalStyle.id = "global-custom-css";
        globalStyle.innerHTML = `
            /* 小説の枠のサイズ変更を禁止 */
            #novel-output { resize: none !important; }
        `;
        document.head.appendChild(globalStyle);
    }

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
                    .gallery-manager, .form, #form-fab, #addLoreEntryBtn, #loreDetailActions { display: none !important; }
                    button[onclick="createNewSeries()"], button[onclick="deleteCurrentSeries()"],
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
        applyBlock(true);
        toggleUI("previewToggleBtn", "inline-block");
        updateText("previewToggleBtn", t("js.backToEdit"));
        toggleUI("settingsGearBtn", "none");
    } else {
        updateText("loginStatus", t("js.viewMode"));
        toggleUI("publishBtn", "none");
        toggleUI("themeCustomizeBtn", "none");
        toggleUI("previewToggleBtn", "none");
        toggleUI("settingsGearBtn", "none");
        applyBlock(true); 
    }

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

function parseBirthdayMonthDay(birthdayStr) {
    if (!birthdayStr) return null;
    const match = String(birthdayStr).match(/(\d{1,2})\s*[\/\-月]\s*(\d{1,2})/);
    if (!match) return null;
    const month = parseInt(match[1], 10);
    const day = parseInt(match[2], 10);
    if (month < 1 || month > 12 || day < 1 || day > 31) return null;
    return { month, day };
}

function checkTodaysBirthdays() {
    if (!Array.isArray(characters) || characters.length === 0) return;
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

    const birthdayChars = characters.filter(c => {
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

    content.innerHTML = birthdayChars.map(c =>
        `<div style="font-size: 20px; font-weight: 800; margin: 6px 0; color: var(--primary);">${escapeHTML(c.name)}</div>`
    ).join("");

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
    checkTodaysBirthdays();
}
window.loadPageData = loadPageData;

window.addEventListener('load', async () => {
    applyTranslations();
    initTheme();
    loadLoreData();
    setupSearchSuggest();
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
});

function addCharacter() {
    const name = document.getElementById("name").value.trim();
    if (!name) return alert("キャラクター名を入力してください！");

    const furigana = (document.getElementById("furigana")?.value || "").trim();
    const occupation = (document.getElementById("occupation")?.value || "").trim();
    const personality = (document.getElementById("personality")?.value || "").trim();
    const world = (document.getElementById("world")?.value || "").trim();
    const group = (document.getElementById("group")?.value || "").trim();
    const tagInput = document.getElementById("tag")?.value || "";
    const tag = tagInput ? tagInput.split(/[,、]/).map(t => t.trim()).filter(Boolean) : [];
    const birthday = (document.getElementById("birthday")?.value || "").trim();
    const color = document.getElementById("color")?.value || "#5865f2";
    const isPublic = document.getElementById("isPublic")?.checked || false;
    const imagePosition = document.getElementById("char-image-position")?.value || "center";

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
        color: color,
        isPublic: isPublic,
        relations: [...tempRelations],
        links: [...tempLinks],
        images: [...tempImages],
        gallery: [...tempCharGallery],
        youtubeUrls: youtubeUrls,
        mainExpressions: [...mainExpressions],
        novelSeries: existingChar && existingChar.novelSeries ? existingChar.novelSeries : [],
        favorite: existingChar ? existingChar.favorite : false,
        isOpen: existingChar ? existingChar.isOpen : false,
        imagePosition: imagePosition,
    };

    const wasEditing = (editId !== null);
    if (editId === null) {
        characters.unshift(characterData);
    } else {
        const index = characters.findIndex(c => c.id === editId);
        if (index !== -1) characters[index] = characterData;
        editId = null;
    }

    document.getElementById("name").value = "";
    if (document.getElementById("furigana")) document.getElementById("furigana").value = "";
    if (document.getElementById("occupation")) document.getElementById("occupation").value = "";
    document.getElementById("personality").value = "";
    document.getElementById("world").value = "";
    document.getElementById("group").value = "";
    document.getElementById("tag").value = "";
    document.getElementById("birthday").value = "";
    document.getElementById("color").value = "#5865f2";
    if (document.getElementById("isPublic")) document.getElementById("isPublic").checked = false;
    tempRelations = [];
    document.getElementById("tempRelationList").innerHTML = "";
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
    closeFormPanel();
    alert(`キャラクター「${characterData.name}」を${wasEditing ? '更新' : '登録'}しました！`);
}
window.addCharacter = addCharacter;

function display() {
    const viewer = auth.currentUser;
    const viewerCanSeePrivate = !!(viewer && currentPageAuthorId && viewer.uid === currentPageAuthorId && !previewAsVisitor);

    const activeCharacters = characters.filter(c => {
        if (c.deletedAt) return false;
        if (!viewerCanSeePrivate && c.isPublic === false) return false;
        return true;
    });

    const relSelect = document.getElementById("relationTargetId");
    if (relSelect) {
        relSelect.innerHTML = '<option value="">-- キャラを選択 --</option>';
        activeCharacters.forEach(c => {
            if (c.id !== editId) {
                relSelect.innerHTML += `<option value="${c.id}">${escapeHTML(c.name)} (${escapeHTML(c.world || t('js.worldless'))})</option>`;
            }
        });
    }

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

    const trashCount = characters.filter(c => c.deletedAt).length;
    const trashBtnContainer = document.getElementById("trashButtonContainer");
    if (trashBtnContainer) {
        trashBtnContainer.innerHTML = `<button type="button" onclick="toggleTrashPanel()" class="header-btn secondary">${t("js.trashBtn")}${trashCount > 0 ? `（${trashCount}）` : ""}</button>`;
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
                    ? `object-fit: contain; background: rgba(0, 0, 0, 0.02);`
                    : `object-position: ${escapeHTML(pos)}; object-fit: cover;`;
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

            const privateBadgeHTML = (viewerCanSeePrivate && c.isPublic === false)
                ? `<span style="position:absolute; top:8px; right:8px; background:var(--secondary); color:white; font-size:10px; font-weight:bold; padding:3px 8px; border-radius:999px;">${t("char.privateBadge")}</span>`
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
            <div class="card" style="border-top: 5px solid ${charColor};">
                ${privateBadgeHTML}
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
    document.getElementById("color").value = c.color || "#5865f2";
    if (document.getElementById("isPublic")) document.getElementById("isPublic").checked = !!c.isPublic;

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

    tempRelations = c.relations ? [...c.relations] : [];
    updateTempRelationDisplay();
    tempLinks = c.links ? [...c.links] : []; 
    updateTempLinkDisplay(); 
    tempImages = c.images ? [...c.images] : [];
    updateTempImageDisplay();
    mainExpressions = c.mainExpressions ? [...c.mainExpressions] : [];
    tempCharGallery = c.gallery ? [...c.gallery] : [];
    renderTempCharGalleryList();

    editId = id; 
    switchFormTab("tab-basic");
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

function addRelationToList() {
    let title = document.getElementById("relationTitle").value.trim() || "関係者";
    const targetId = document.getElementById("relationTargetId").value;
    if (!targetId) return alert("相手キャラクターを選択してください！");
    tempRelations.push({ title: title, targetId: Number(targetId) });
    document.getElementById("relationTitle").value = "";
    document.getElementById("relationTargetId").value = "";
    updateTempRelationDisplay();
}
window.addRelationToList = addRelationToList;

function removeRelationFromList(index) { tempRelations.splice(index, 1); updateTempRelationDisplay(); }
window.removeRelationFromList = removeRelationFromList;

function updateTempRelationDisplay() {
    const container = document.getElementById("tempRelationList");
    if (!container) return;
    container.innerHTML = tempRelations.map((rel, index) => {
        const target = characters.find(c => c.id === rel.targetId);
        const name = target ? target.name : "不明";
        return `<span style="background:var(--card-bg); border:1px solid var(--card-border); padding:3px 8px; border-radius:4px; font-size:12px;">${escapeHTML(rel.title)}: ${escapeHTML(name)}<button type="button" onclick="removeRelationFromList(${index})" style="background:none; border:none; color:var(--danger); cursor:pointer; padding:0 3px;">×</button></span>`;
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

    const mainImg = document.getElementById("charDetailMainImg");
    if (mainImg) mainImg.src = current ? current.url : "";

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
                <img src="${escapeHTML(exp.url)}" title="${escapeHTML(exp.title || "")}" onclick="document.getElementById('charDetailMainImg').src='${escapeHTML(exp.url)}'">
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

    if (pageId === "home-page") initGallerySlider();
    if (pageId === "novel-page") updateNovelSelectors();
    if (pageId === "lore-page") renderLoreEntries();
    if (pageId === "board-page") renderBoard();
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
    const rows = [];
    getVisibleCharacters().forEach(c => (c.novelSeries || []).forEach((ser, idx) => rows.push({ c, ser, idx })));
    if (rows.length === 0) {
        box.innerHTML = `<p style="color:var(--text-muted); font-size:13px; margin:0;">${t("novel.overviewEmpty")}</p>`;
        return;
    }
    rows.sort((a, b) => (b.ser.updatedAt || 0) - (a.ser.updatedAt || 0));
    box.innerHTML = rows.map(r => {
        const date = r.ser.updatedAt ? new Date(r.ser.updatedAt).toLocaleDateString(currentLang) : "";
        return `<div class="novel-overview-row" onclick="jumpToNovelSeries(${r.c.id}, ${r.idx})">
            <div style="font-weight:bold;">${escapeHTML(r.ser.name)}</div>
            <div style="font-size:12px; color:var(--text-muted);">${escapeHTML(r.c.name)} ・ ${r.ser.episodes.length}${t("novel.episodeUnit")}${date ? " ・ " + date : ""}</div>
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
    if (!char.novelSeries || char.novelSeries.length === 0) { 
        select.innerHTML = '<option value="-1">-- 作品がありません --</option>'; 
        document.getElementById("episode-section").style.display = "none"; 
        document.getElementById("editor-section").style.display = "none"; 
        currentSeriesIdx = -1; 
        return; 
    }
    select.innerHTML = char.novelSeries.map((ser, idx) => `<option value="${idx}" ${currentSeriesIdx === idx ? 'selected' : ''}>${escapeHTML(ser.name)} (${ser.episodes.length}話)</option>`).join('');
    document.getElementById("episode-section").style.display = "block"; 
    renderEpisodeTabs();
}

function changeSeries() { 
    currentSeriesIdx = Number(document.getElementById("novel-series-select").value); 
    currentEpisodeIdx = -1; 
    renderEpisodeTabs(); 
}
window.changeSeries = changeSeries;

function createNewSeries() {
    const char = characters.find(c => String(c.id) === String(currentNovelCharId)); 
    if (!char) return alert("キャラクターが選択されていません。先にキャラクターを選んでください。");
    if (!char.novelSeries) char.novelSeries = [];
    const title = prompt("新しいシリーズのタイトルを入力してください：");
    if (!title || !title.trim()) return;
    char.novelSeries.push({ name: title.trim(), episodes: [], updatedAt: Date.now() });
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
    if (currentSeriesIdx === -1 || !char.novelSeries[currentSeriesIdx]) { container.innerHTML = ""; document.getElementById("editor-section").style.display = "none"; return; }
    const eps = char.novelSeries[currentSeriesIdx].episodes;
    if (eps.length === 0) { container.innerHTML = '<span style="color:var(--text-muted); font-size:13px;">まだエピソードがありません。</span>'; document.getElementById("editor-section").style.display = "none"; return; }
    container.innerHTML = eps.map((ep, idx) => `<button type="button" onclick="selectEpisode(${idx})" class="proseka-btn ${currentEpisodeIdx === idx ? 'active' : ''}">${escapeHTML(ep.title || `第${idx+1}話`)}</button>`).join('');
    if (currentEpisodeIdx === -1 && eps.length > 0) { selectEpisode(0); } else if (currentEpisodeIdx !== -1) { openEditor(); }
}

function selectEpisode(idx) { currentEpisodeIdx = idx; renderEpisodeTabs(); }
window.selectEpisode = selectEpisode;

function openEditor() {
    const char = characters.find(c => c.id === currentNovelCharId);
    const ep = char.novelSeries[currentSeriesIdx].episodes[currentEpisodeIdx];
    document.getElementById("editor-section").style.display = "block";
    document.getElementById("episode-title").value = ep.title || "";
    document.getElementById("novel-output").value = ep.content || "";
    document.getElementById("novel-theme").value = ""; 
    applyNovelWritingModeUI();
}

function createNewEpisode() {
    const char = characters.find(c => c.id === currentNovelCharId); if (currentSeriesIdx === -1 || !char) return;
    const eps = char.novelSeries[currentSeriesIdx].episodes;
    eps.push({ title: `第${eps.length+1}話`, content: "" });
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
    char.novelSeries[currentSeriesIdx].episodes[currentEpisodeIdx].title = inputTitle || `第${currentEpisodeIdx+1}話`;
    char.novelSeries[currentSeriesIdx].episodes[currentEpisodeIdx].content = document.getElementById("novel-output").value;
    touchSeries(char.novelSeries[currentSeriesIdx]);
    localStorage.setItem("characters", JSON.stringify(characters)); 
    renderSeriesSelect(); 
    display(); 
    renderNovelSeriesOverview();
    const savedToCloud = await persistCharacterToCloud(char);
    alert(savedToCloud ? t("novel.saved") : t("novel.savedLocalOnly"));
}
window.saveNovelText = saveNovelText;

// =========================================
// ネットに保存
// =========================================
async function publishToWeb() {
    const user = auth.currentUser;
    if (!user) return alert("保存するにはログインが必要です！");

    const urlParams = new URLSearchParams(window.location.search);
    let pageId = urlParams.get('id');

    const pageData = {
        authorId: user.uid,
        galleryImagesJson: firebase.firestore.FieldValue.delete(),
        galleryImages: firebase.firestore.FieldValue.delete()
    };

    try {
        if (pageId) {
            if (currentPageAuthorId && currentPageAuthorId !== user.uid) {
                return alert("他人の図鑑は上書き保存できません！");
            }
            await db.collection("pages").doc(pageId).set(pageData, { merge: true });
            
            const batch = db.batch();
            characters.forEach(c => {
                const charRef = db.collection("pages").doc(pageId).collection("characters").doc(String(c.id));
                batch.set(charRef, c);
            });
            galleryImages.forEach((img, idx) => {
                const imgRef = db.collection("pages").doc(pageId).collection("galleryImages").doc(String(img.id));
                batch.set(imgRef, { ...img, order: idx });
            });
            await batch.commit();

            alert("図鑑のデータを更新しました！");
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

            const batch = db.batch();
            characters.forEach(c => {
                const charRef = db.collection("pages").doc(pageId).collection("characters").doc(String(c.id));
                batch.set(charRef, c);
            });
            galleryImages.forEach((img, idx) => {
                const imgRef = db.collection("pages").doc(pageId).collection("galleryImages").doc(String(img.id));
                batch.set(imgRef, { ...img, order: idx });
            });
            await batch.commit();

            alert("新しい図鑑をネットに公開しました！専用URLへ移動します。");
            window.location.href = `?id=${pageId}`;
        }
    } catch (error) {
        console.error("保存エラー:", error);
        alert("保存に失敗しました。");
    }
}
window.publishToWeb = publishToWeb;

function compressImage(file, maxSize = 1600) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                let width = img.width, height = img.height;
                if (width > height && width > maxSize) {
                    height *= maxSize / width;
                    width = maxSize;
                } else if (height > maxSize) {
                    width *= maxSize / height;
                    height = maxSize;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.88));
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

function loadCreatorList() {
    const listContainer = document.getElementById("author-links-list");
    if (!listContainer) return;

    db.collection("profiles").orderBy("updatedAt", "desc").get().then(async (querySnapshot) => {
        listContainer.innerHTML = "";
        if (querySnapshot.empty) {
            listContainer.innerHTML = `<p style='color:var(--text-muted); font-size:14px;'>${t("portal.noCreatorsYet")}</p>`;
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
    const isAdmin = localStorage.getItem("isAdminMode") === "true";
    const editNewsBtn = document.getElementById("admin-edit-news-btn");
    const adminStatusText = document.getElementById("admin-status");
    if (editNewsBtn) editNewsBtn.style.display = isAdmin ? "inline-block" : "none";
    if (adminStatusText) adminStatusText.innerText = isAdmin ? "管理者モード有効中" : "";
}

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
        form.scrollTop = 0;
    }
}
window.toggleFormFullscreen = toggleFormFullscreen;

function openFormPanel() {
    const form = document.getElementById('charFormPanel');
    const fab = document.getElementById('form-fab');
    if (!form) return;
    form.classList.add('open');
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
    if (e.target.closest('#charFormPanel, #form-fab, button[onclick^="editCharacter"], #imageModal, #characterDetailOverlay, #settingsPanel, #birthdayPopup, .custom-modal-overlay')) return;
    closeFormPanel();
});

document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const form = document.getElementById('charFormPanel');
    if (form && form.classList.contains('open')) closeFormPanel();
});

// =========================================
// 個人サイト風アクセスカウンター ＆ キリ番判定
// =========================================
function updateVisitorCounter() {
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('id') || 'local_user';
    const storageKey = `visitor_count_${pageId}`;
    
    let count = parseInt(localStorage.getItem(storageKey) || "120", 10);
    // 初回セッション時カウントアップ
    if (!sessionStorage.getItem(`visited_${pageId}`)) {
        count += 1;
        localStorage.setItem(storageKey, count.toString());
        sessionStorage.setItem(`visited_${pageId}`, "true");
    }

    const strip = document.getElementById("visitorCounterStrip");
    const badge = document.getElementById("kiribanBadge");
    if (!strip) return;

    const countStr = count.toString().padStart(5, "0");
    strip.innerHTML = countStr.split("").map(digit => `<span class="counter-digit">${digit}</span>`).join("");

    // キリ番判定（ゾロ目 777, 1111, 2222, 末尾00, 連番 1234 等）
    const isKiriban = (count % 100 === 0) || 
                      /^([0-9])\1+$/.test(count.toString()) || 
                      count === 1234 || count === 777 || count === 555;

    if (badge) {
        if (isKiriban) {
            badge.style.display = "inline-block";
            badge.textContent = `★ ${count}人目 キリ番GET! (*'ω'*)`;
            badge.onclick = () => {
                openSendCheerModal();
                const msgArea = document.getElementById("cheerMessage");
                if (msgArea) msgArea.value = `キリ番【${count}人目】を踏みました！いつも作品楽しみに見ています (*'ω'*)`;
            };
        } else {
            badge.style.display = "none";
        }
    }
}

// =========================================
// 属性十字マップ ＆ ティア表メーカー
// =========================================
let currentBoardMode = "matrix";
let boardConfig = {
    matrix: {
        labels: { top: "理性的 ▲", bottom: "本能的 ▼", left: "◀ 内向的", right: "外向的 ▶" },
        positions: {} // charId -> { x: 50, y: 50 } (percentage)
    },
    tier: {
        placements: {} // charId -> tier (S, A, B, C, D)
    }
};

function loadBoardData() {
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('id') || 'local';
    const saved = localStorage.getItem(`board_data_${pageId}`);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (parsed.matrix) boardConfig.matrix = parsed.matrix;
            if (parsed.tier) boardConfig.tier = parsed.tier;
        } catch (e) {
            console.error("Board load failed", e);
        }
    }
}

function saveBoardData() {
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('id') || 'local';
    localStorage.setItem(`board_data_${pageId}`, JSON.stringify(boardConfig));
    alert("ボードの配置を保存しました！");
}
window.saveBoardData = saveBoardData;

function switchBoardMode(mode) {
    currentBoardMode = mode;
    const tabMatrix = document.getElementById("tabBtnMatrix");
    const tabTier = document.getElementById("tabBtnTier");
    const containerMatrix = document.getElementById("matrixContainer");
    const containerTier = document.getElementById("tierContainer");

    if (mode === "matrix") {
        if (tabMatrix) tabMatrix.classList.add("active");
        if (tabTier) tabTier.classList.remove("active");
        if (containerMatrix) containerMatrix.style.display = "block";
        if (containerTier) containerTier.style.display = "none";
    } else {
        if (tabMatrix) tabMatrix.classList.remove("active");
        if (tabTier) tabTier.classList.add("active");
        if (containerMatrix) containerMatrix.style.display = "none";
        if (containerTier) containerTier.style.display = "flex";
    }
    renderBoard();
}
window.switchBoardMode = switchBoardMode;

function editMatrixLabel(direction) {
    const current = boardConfig.matrix.labels[direction] || "";
    const updated = prompt("新しい軸ラベルを入力してください：", current);
    if (updated !== null && updated.trim()) {
        boardConfig.matrix.labels[direction] = updated.trim();
        updateMatrixLabelElements();
    }
}
window.editMatrixLabel = editMatrixLabel;

function updateMatrixLabelElements() {
    const lblTop = document.getElementById("matrixLabelTop");
    const lblBottom = document.getElementById("matrixLabelBottom");
    const lblLeft = document.getElementById("matrixLabelLeft");
    const lblRight = document.getElementById("matrixLabelRight");

    if (lblTop) lblTop.textContent = boardConfig.matrix.labels.top;
    if (lblBottom) lblBottom.textContent = boardConfig.matrix.labels.bottom;
    if (lblLeft) lblLeft.textContent = boardConfig.matrix.labels.left;
    if (lblRight) lblRight.textContent = boardConfig.matrix.labels.right;
}

function editTierRowLabel(el) {
    const current = el.textContent.trim();
    const updated = prompt("ランク・グループ名を入力：", current);
    if (updated !== null && updated.trim()) {
        el.textContent = updated.trim();
    }
}
window.editTierRowLabel = editTierRowLabel;

function resetBoardTokens() {
    if (!confirm("現在の配置をすべてリセットしますか？")) return;
    if (currentBoardMode === "matrix") {
        boardConfig.matrix.positions = {};
    } else {
        boardConfig.tier.placements = {};
    }
    renderBoard();
}
window.resetBoardTokens = resetBoardTokens;

function renderBoard() {
    loadBoardData();
    updateMatrixLabelElements();

    const dock = document.getElementById("boardCharDock");
    const matrixArea = document.getElementById("matrixPlacedArea");
    if (!dock || !matrixArea) return;

    matrixArea.innerHTML = "";
    dock.innerHTML = "";
    document.querySelectorAll(".tier-row-items").forEach(el => el.innerHTML = "");

    const activeChars = characters.filter(c => !c.deletedAt);

    activeChars.forEach(c => {
        const charId = String(c.id);
        const imgUrl = (c.images && c.images[0]) ? c.images[0].url : "";
        const charColor = c.color || "#5865f2";

        const token = document.createElement("div");
        token.className = "char-token";
        token.draggable = true;
        token.dataset.charId = charId;
        token.title = `${c.name} (${c.world || '未設定'})`;
        token.style.borderColor = charColor;
        if (imgUrl) token.style.backgroundImage = `url("${imgUrl}")`;
        token.innerHTML = `<span class="char-token-name">${escapeHTML(c.name)}</span>`;

        token.ondragstart = (e) => {
            e.dataTransfer.setData("text/plain", charId);
        };

        if (currentBoardMode === "matrix") {
            const pos = boardConfig.matrix.positions[charId];
            if (pos) {
                token.classList.add("matrix-token");
                token.style.left = `${pos.x}%`;
                token.style.top = `${pos.y}%`;
                matrixArea.appendChild(token);
            } else {
                dock.appendChild(token);
            }
        } else {
            const tier = boardConfig.tier.placements[charId];
            if (tier) {
                const tierRow = document.querySelector(`.tier-row[data-tier="${tier}"] .tier-row-items`);
                if (tierRow) {
                    tierRow.appendChild(token);
                } else {
                    dock.appendChild(token);
                }
            } else {
                dock.appendChild(token);
            }
        }
    });

    setupMatrixDropArea();
}

function setupMatrixDropArea() {
    const matrix = document.getElementById("matrixContainer");
    if (!matrix) return;

    matrix.ondragover = (e) => {
        e.preventDefault();
    };

    matrix.ondrop = (e) => {
        e.preventDefault();
        const charId = e.dataTransfer.getData("text/plain");
        if (!charId) return;

        const rect = matrix.getBoundingClientRect();
        let x = ((e.clientX - rect.left) / rect.width) * 100;
        let y = ((e.clientY - rect.top) / rect.height) * 100;

        x = Math.max(5, Math.min(95, x));
        y = Math.max(5, Math.min(95, y));

        boardConfig.matrix.positions[charId] = { x: Math.round(x), y: Math.round(y) };
        renderBoard();
    };
}

function allowTierDrop(e) {
    e.preventDefault();
}
window.allowTierDrop = allowTierDrop;

function handleTierDrop(e, tier) {
    e.preventDefault();
    const charId = e.dataTransfer.getData("text/plain");
    if (!charId) return;

    boardConfig.tier.placements[charId] = tier;
    renderBoard();
}
window.handleTierDrop = handleTierDrop;

function handleDockDrop(e) {
    e.preventDefault();
    const charId = e.dataTransfer.getData("text/plain");
    if (!charId) return;

    if (currentBoardMode === "matrix") {
        delete boardConfig.matrix.positions[charId];
    } else {
        delete boardConfig.tier.placements[charId];
    }
    renderBoard();
}
window.handleDockDrop = handleDockDrop;

// 初期化時にアクセスカウンターを更新
window.addEventListener("DOMContentLoaded", () => {
    updateVisitorCounter();
});

