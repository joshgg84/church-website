    // BIBLE DATA
    const bibleBooks = {
        oldTestament: [
            "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
            "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
            "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
            "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
            "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations",
            "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
            "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
            "Zephaniah", "Haggai", "Zechariah", "Malachi"
        ],
        newTestament: [
            "Matthew", "Mark", "Luke", "John", "Acts",
            "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
            "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy",
            "2 Timothy", "Titus", "Philemon", "Hebrews", "James",
            "1 Peter", "2 Peter", "1 John", "2 John", "3 John",
            "Jude", "Revelation"
        ]
    };

    const bookChapters = {
        "Genesis": 50, "Exodus": 40, "Leviticus": 27, "Numbers": 36, "Deuteronomy": 34,
        "Joshua": 24, "Judges": 21, "Ruth": 4, "1 Samuel": 31, "2 Samuel": 24,
        "1 Kings": 22, "2 Kings": 25, "1 Chronicles": 29, "2 Chronicles": 36, "Ezra": 10,
        "Nehemiah": 13, "Esther": 10, "Job": 42, "Psalms": 150, "Proverbs": 31,
        "Ecclesiastes": 12, "Song of Solomon": 8, "Isaiah": 66, "Jeremiah": 52, "Lamentations": 5,
        "Ezekiel": 48, "Daniel": 12, "Hosea": 14, "Joel": 3, "Amos": 9,
        "Obadiah": 1, "Jonah": 4, "Micah": 7, "Nahum": 3, "Habakkuk": 3,
        "Zephaniah": 3, "Haggai": 2, "Zechariah": 14, "Malachi": 4,
        "Matthew": 28, "Mark": 16, "Luke": 24, "John": 21, "Acts": 28,
        "Romans": 16, "1 Corinthians": 16, "2 Corinthians": 13, "Galatians": 6, "Ephesians": 6,
        "Philippians": 4, "Colossians": 4, "1 Thessalonians": 5, "2 Thessalonians": 3, "1 Timothy": 6,
        "2 Timothy": 4, "Titus": 3, "Philemon": 1, "Hebrews": 13, "James": 5,
        "1 Peter": 5, "2 Peter": 3, "1 John": 5, "2 John": 1, "3 John": 1,
        "Jude": 1, "Revelation": 22
    };

    // DOM ELEMENTS
    const oldTestamentBtn = document.getElementById('oldTestament');
    const newTestamentBtn = document.getElementById('newTestament');
    const booksContainer = document.getElementById('booksContainer');
    const chaptersContainer = document.getElementById('chaptersContainer');
    const chaptersGrid = document.getElementById('chaptersGrid');
    const selectedBookSpan = document.getElementById('selectedBook');
    const bibleTextContainer = document.getElementById('bibleTextContainer');
    const passageTitle = document.getElementById('passageTitle');
    const bibleText = document.getElementById('bibleText');
    const searchInput = document.getElementById('search');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');
    const resultsContainer = document.getElementById('resultsContainer');
    const prevChapterBtn = document.getElementById('prevChapter');
    const nextChapterBtn = document.getElementById('nextChapter');
    const backToBooksBtn = document.getElementById('backToBooks');
    const backToChaptersBtn = document.getElementById('backToChapters');
    const backFromSearchBtn = document.getElementById('backFromSearch');
    
    // VERSE SELECTOR ELEMENTS
    const verseSelector = document.getElementById('verseSelector');
    const selectedChapterInfo = document.getElementById('selectedChapterInfo');
    const verseInput = document.getElementById('verseInput');
    const goToVerseBtn = document.getElementById('goToVerseBtn');
    const skipVerseBtn = document.getElementById('skipVerseBtn');
    const changeVerseBtn = document.getElementById('changeVerseBtn');
    const currentVerseDisplay = document.getElementById('currentVerseDisplay');

    // APP STATE
    let currentTestament = 'oldTestament';
    let currentBook = null;
    let currentChapter = 1;
    let currentVerse = null;
    let preloadedData = null;

    // INITIALIZE APP
    function init() {
        loadBooks('oldTestament');
        setupEventListeners();
    }

    // LOAD BOOKS FOR TESTAMENT
    function loadBooks(testament) {
        booksContainer.innerHTML = '';
        bibleBooks[testament].forEach(book => {
            const bookBtn = document.createElement('button');
            bookBtn.className = 'book-btn';
            bookBtn.textContent = book;
            bookBtn.onclick = () => selectBook(book);
            booksContainer.appendChild(bookBtn);
        });
    }

    // SELECT BOOK
    function selectBook(book) {
        currentBook = book;
        selectedBookSpan.textContent = book;
        
        // LOAD CHAPTERS
        chaptersGrid.innerHTML = '';
        const totalChapters = bookChapters[book];
        for (let i = 1; i <= totalChapters; i++) {
            const chapterBtn = document.createElement('button');
            chapterBtn.className = 'chapter-btn';
            chapterBtn.textContent = i;
            chapterBtn.onclick = () => selectChapter(i);
            chaptersGrid.appendChild(chapterBtn);
        }
        
        // SHOW CHAPTERS CONTAINER
        chaptersContainer.classList.add('active');
        booksContainer.style.display = 'none';
        bibleTextContainer.classList.remove('active');
        verseSelector.classList.remove('active');
        searchResults.classList.remove('active');
    }

    // SELECT CHAPTER - SHOWS VERSE SELECTOR
    async function selectChapter(chapter) {
        currentChapter = chapter;
        currentVerse = null;
        
        // SHOW VERSE SELECTOR
        selectedChapterInfo.textContent = `${currentBook} Chapter ${chapter}`;
        verseSelector.classList.add('active');
        verseInput.value = '';
        verseInput.focus();
        
        // HIDE OTHER CONTAINERS
        bibleTextContainer.classList.remove('active');
        chaptersContainer.classList.remove('active');
        booksContainer.style.display = 'none';
        searchResults.classList.remove('active');
        
        // PRELOAD CHAPTER IN BACKGROUND
        preloadedData = null;
        try {
            const response = await fetch(`https://bible-api.com/${encodeURIComponent(currentBook)}+${chapter}?translation=kjv`);
            if (response.ok) {
                preloadedData = await response.json();
            }
        } catch (error) {
            console.log('Preload failed:', error);
        }
    }

    // LOAD CHAPTER WITH OPTIONAL VERSE
    async function loadChapterWithVerse(chapter, verseNumber = null) {
        currentChapter = chapter;
        currentVerse = verseNumber;
        
        // UPDATE DISPLAY
        passageTitle.textContent = `${currentBook} Chapter ${chapter}`;
        currentVerseDisplay.textContent = verseNumber ? `Viewing: Verse ${verseNumber}` : 'Reading full chapter';
        
        // SHOW LOADING
        bibleText.innerHTML = '<div style="text-align: center; padding: 40px;"><i class="fas fa-spinner fa-spin fa-2x"></i><p style="margin-top: 15px;">Loading Bible text...</p></div>';
        
        // SHOW BIBLE TEXT CONTAINER
        bibleTextContainer.classList.add('active');
        verseSelector.classList.remove('active');
        chaptersContainer.classList.remove('active');
        searchResults.classList.remove('active');
        
        try {
            // USE PRELOADED DATA OR FETCH NEW
            let passageData = preloadedData;
            if (!passageData) {
                const response = await fetch(`https://bible-api.com/${encodeURIComponent(currentBook)}+${chapter}?translation=kjv`);
                if (response.ok) {
                    passageData = await response.json();
                }
            }
            
            if (passageData && passageData.verses) {
                displayBibleText(passageData.verses, verseNumber);
            } else {
                throw new Error('No passage data');
            }
            
            // CLEAR PRELOADED DATA
            preloadedData = null;
        } catch (error) {
            console.error('Error loading chapter:', error);
            bibleText.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <i class="fas fa-exclamation-triangle fa-2x" style="color: orange;"></i>
                    <p style="margin-top: 15px; color: #666;">Could not load chapter.</p>
                    <p style="color: #888; font-size: 0.9rem;">Try: ${currentBook} ${chapter}:1-10</p>
                </div>
            `;
        }
        
        updateNavigation();
    }

    // DISPLAY BIBLE TEXT WITH OPTIONAL VERSE HIGHLIGHT
    function displayBibleText(verses, highlightVerse = null) {
        bibleText.innerHTML = `
            <div id="versesContainer">
                ${verses.map(verse => {
                    const verseNum = verse.verse;
                    const isHighlighted = highlightVerse === parseInt(verseNum);
                    
                    return `
                        <div class="verse ${isHighlighted ? 'verse-highlighted' : ''}" id="verse-${verseNum}">
                            <span class="verse-num">${verseNum}</span>
                            ${verse.text}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        // SCROLL TO HIGHLIGHTED VERSE
        if (highlightVerse !== null) {
            setTimeout(() => {
                const verseElement = document.getElementById(`verse-${highlightVerse}`);
                if (verseElement) {
                    verseElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }, 300);
        }
    }

    // SEARCH BIBLE
    async function searchBible() {
        const query = searchInput.value.trim();
        if (!query) return;
        
        resultsContainer.innerHTML = '<div style="text-align: center; padding: 20px;"><i class="fas fa-spinner fa-spin"></i> Searching...</div>';
        searchResults.classList.add('active');
        bibleTextContainer.classList.remove('active');
        verseSelector.classList.remove('active');
        chaptersContainer.classList.remove('active');
        booksContainer.style.display = 'none';
        
        try {
            const response = await fetch(`https://bible-api.com/${encodeURIComponent(query)}?translation=kjv`);
            if (response.ok) {
                const data = await response.json();
                displaySearchResults(data);
            } else {
                resultsContainer.innerHTML = '<p style="text-align: center; padding: 20px; color: #666;">No results found. Try: "John 3:16" or "love"</p>';
            }
        } catch (error) {
            resultsContainer.innerHTML = '<p style="text-align: center; padding: 20px; color: #666;">Search unavailable. Please try again.</p>';
        }
    }

    // DISPLAY SEARCH RESULTS
    function displaySearchResults(data) {
        if (data.verses && data.verses.length > 0) {
            resultsContainer.innerHTML = data.verses.slice(0, 10).map(verse => `
                <div class="result-item" onclick="goToSearchResult('${verse.book_name}', ${verse.chapter}, ${verse.verse})">
                    <div class="result-ref"><i class="fas fa-bookmark"></i> ${verse.book_name} ${verse.chapter}:${verse.verse}</div>
                    <div class="result-text">${verse.text}</div>
                </div>
            `).join('');
        } else {
            resultsContainer.innerHTML = '<p style="text-align: center; padding: 20px; color: #666;">No results found for your search.</p>';
        }
    }

    // GO TO VERSE FROM SEARCH RESULTS
    window.goToSearchResult = function(bookName, chapter, verse) {
        currentBook = bookName;
        
        // SHOW VERSE SELECTOR WITH PRE-FILLED VERSE
        selectedChapterInfo.textContent = `${bookName} Chapter ${chapter}`;
        verseInput.value = verse;
        verseSelector.classList.add('active');
        bibleTextContainer.classList.remove('active');
        chaptersContainer.classList.remove('active');
        booksContainer.style.display = 'none';
        searchResults.classList.remove('active');
        
        // PRELOAD THE CHAPTER
        preloadedData = null;
        fetch(`https://bible-api.com/${encodeURIComponent(bookName)}+${chapter}?translation=kjv`)
            .then(r => r.ok ? r.json() : null)
            .then(data => preloadedData = data)
            .catch(console.error);
        
        // SET CURRENT CHAPTER FOR NAVIGATION
        currentChapter = chapter;
    };

    // UPDATE NAVIGATION BUTTONS
    function updateNavigation() {
        const totalChapters = bookChapters[currentBook];
        prevChapterBtn.disabled = currentChapter <= 1;
        nextChapterBtn.disabled = currentChapter >= totalChapters;
    }

    // SHOW VERSE SELECTOR AGAIN
    window.showVerseSelector = function() {
        selectedChapterInfo.textContent = `${currentBook} Chapter ${currentChapter}`;
        verseInput.value = currentVerse || '';
        verseSelector.classList.add('active');
        bibleTextContainer.classList.remove('active');
        verseInput.focus();
    };

    // SETUP EVENT LISTENERS
    function setupEventListeners() {
        // TESTAMENT BUTTONS
        oldTestamentBtn.onclick = () => {
            currentTestament = 'oldTestament';
            oldTestamentBtn.classList.add('active');
            newTestamentBtn.classList.remove('active');
            loadBooks('oldTestament');
            resetView();
        };
        
        newTestamentBtn.onclick = () => {
            currentTestament = 'newTestament';
            newTestamentBtn.classList.add('active');
            oldTestamentBtn.classList.remove('active');
            loadBooks('newTestament');
            resetView();
        };

        // SEARCH
        searchBtn.onclick = searchBible;
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchBible();
        });

        // VERSE SELECTOR
        goToVerseBtn.onclick = () => {
            const verseNumber = parseInt(verseInput.value);
            if (!verseNumber || verseNumber < 1) {
                alert('Please enter a valid verse number (1 or higher)');
                verseInput.focus();
                return;
            }
            loadChapterWithVerse(currentChapter, verseNumber);
        };

        skipVerseBtn.onclick = () => {
            loadChapterWithVerse(currentChapter); // WHOLE CHAPTER
        };

        verseInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') goToVerseBtn.click();
        });

        // CHANGE VERSE BUTTON
        changeVerseBtn.onclick = showVerseSelector;

        // CHAPTER NAVIGATION
        prevChapterBtn.onclick = () => {
            if (currentChapter > 1) {
                selectChapter(currentChapter - 1);
            }
        };

        nextChapterBtn.onclick = () => {
            if (currentChapter < bookChapters[currentBook]) {
                selectChapter(currentChapter + 1);
            }
        };

        // BACK BUTTONS
        backToBooksBtn.onclick = resetView;
        
        backToChaptersBtn.onclick = () => {
            bibleTextContainer.classList.remove('active');
            verseSelector.classList.remove('active');
            chaptersContainer.classList.add('active');
        };
        
        backFromSearchBtn.onclick = resetView;

        // KEYBOARD SHORTCUTS
        document.addEventListener('keydown', (e) => {
            // ESCAPE KEY - GO BACK OR CANCEL
            if (e.key === 'Escape') {
                if (verseSelector.classList.contains('active')) {
                    loadChapterWithVerse(currentChapter); // LOAD WHOLE CHAPTER
                } else if (bibleTextContainer.classList.contains('active')) {
                    bibleTextContainer.classList.remove('active');
                    chaptersContainer.classList.add('active');
                } else if (chaptersContainer.classList.contains('active')) {
                    resetView();
                }
            }
            
            // ARROW KEYS IN VERSE SELECTOR
            if (verseSelector.classList.contains('active') && document.activeElement === verseInput) {
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const currentVal = parseInt(verseInput.value) || 1;
                    verseInput.value = Math.max(1, currentVal - 1);
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const currentVal = parseInt(verseInput.value) || 1;
                    verseInput.value = currentVal + 1;
                }
            }
        });
    }

    // RESET VIEW TO BOOKS
    function resetView() {
        booksContainer.style.display = 'grid';
        chaptersContainer.classList.remove('active');
        bibleTextContainer.classList.remove('active');
        verseSelector.classList.remove('active');
        searchResults.classList.remove('active');
    }

    // INITIALIZE APP
    init();