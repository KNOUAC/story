document.addEventListener('DOMContentLoaded', function() {
    let codeBlocks = document.querySelectorAll('div.highlighter-rouge');
    if (codeBlocks.length === 0) {
        codeBlocks = document.querySelectorAll('pre');
    }

    const svgCopyIcon = `<svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>`;
    const originalIcon = svgCopyIcon;

    codeBlocks.forEach(block => {
        if (block.closest('.code-container')) return;

        const pre = block.tagName.toLowerCase() === 'pre' ? block : block.querySelector('pre');
        if (!pre) return;

        // 1. 언어(Language) 추출 (Jekyll 마크다운 기준)
        let lang = 'text';
        const classList = Array.from(block.classList);
        const langClass = classList.find(c => c.startsWith('language-'));
        if (langClass) {
            lang = langClass.replace('language-', '');
        } else if (pre.className.includes('language-')) {
            const preLangClass = Array.from(pre.classList).find(c => c.startsWith('language-'));
            if (preLangClass) lang = preLangClass.replace('language-', '');
        }

        // 2. 컨테이너 생성
        const container = document.createElement('div');
        container.className = 'code-container';
        
        // 3. 헤더 생성 (왼쪽 신호등 + 오른쪽 언어 라벨)
        const header = document.createElement('div');
        header.className = 'code-header';
        header.innerHTML = `
            <div class="window-controls">
                <span class="dot red"></span>
                <span class="dot yellow" title="접기/펼치기"></span>
                <span class="dot green"></span>
            </div>
            <span class="lang-label">${lang}</span>
        `;

        // 4. 슬라이드 복사 버튼 생성
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-button';
        copyBtn.title = "Copy Code";
        copyBtn.innerHTML = svgCopyIcon;

        // 노란색 버튼 클릭 시 접기/펼치기
        const yellowDot = header.querySelector('.yellow');
        yellowDot.addEventListener('click', (e) => {
            e.stopPropagation();
            container.classList.toggle('collapsed');
        });

        // 복사 버튼 기능
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(pre.innerText).then(() => {
                copyBtn.classList.add('success');
                copyBtn.innerText = 'Copied!';
                setTimeout(() => {
                    copyBtn.classList.remove('success');
                    copyBtn.innerHTML = originalIcon;
                }, 2000);
            });
        });

        // 5. DOM 재조립 (컨테이너 안에 헤더 -> 복사버튼 -> 코드블록 순서로 넣기)
        block.parentNode.insertBefore(container, block);
        container.appendChild(header);
        container.appendChild(copyBtn); 
        container.appendChild(block); 

        // Prism.js 라인 넘버 활성화
        pre.classList.add('line-numbers');
        if (lang !== 'text') {
            pre.classList.add(`language-${lang}`);
            const code = pre.querySelector('code');
            if (code) code.classList.add(`language-${lang}`);
        }
    });

    if (window.Prism) Prism.highlightAll();
});
