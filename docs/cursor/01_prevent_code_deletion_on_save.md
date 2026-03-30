---
layout: default
title: "[Cursor/VSCode] 저장 시 자동 삭제(포맷/수정) 막기: 프로젝트 전용 가이드"
---

## **증상**
에디터에 "문법에 맞지 않는 구문"을 추가한 뒤 저장하면, 해당 구문이 저장 과정에서 자동으로 수정/삭제되는 경우가 있습니다.  

## **원인 (가장 흔한 케이스)**
저장할 때 **포맷(Format)** 또는 **코드 액션(Code Actions)**이 자동으로 실행되면서, 문법에 맞지 않는 구문을 **수정/삭제**합니다.
* `editor.formatOnSave`: 저장 시 포맷(예: Prettier) 실행  
* `editor.codeActionsOnSave`: 저장 시 코드 액션(예: ESLint 자동 수정, imports 정리 등) 실행  
* 특히 ESLint/포매터가 “문법/규칙 위반”으로 판단하면, 저장 과정에서 해당 부분을 제거하거나 고쳐버림

## **1) 권장: 현재 프로젝트에서만 끄기**
프로젝트 루트에 `.vscode/settings.json` 파일을 만들거나 수정하세요.

```json
{  
  "editor.formatOnSave": false,  
  "editor.codeActionsOnSave": {  
    "source.fixAll": "never",  
    "source.fixAll.eslint": "never",  
    "source.organizeImports": "never"  
  }  
}
```

ESLint 포맷까지 같이 끄고 싶다면, `eslint.format.enable: false` 설정도 추가합니다.

```json
{  
  "editor.formatOnSave": false,  
  "editor.codeActionsOnSave": {  
    "source.fixAll": "never",  
    "source.fixAll.eslint": "never",  
    "source.organizeImports": "never"  
  },  
  "eslint.format.enable": false  
}
```

## **2) (참고!) 전체 끄기: 사용자 전역**
사용자 설정(User Settings)에서 아래를 적용하면 모든 프로젝트에 공통 적용됩니다.

```json
{  
  "editor.formatOnSave": false,  
  "editor.codeActionsOnSave": {  
    "source.fixAll": "never",  
    "source.fixAll.eslint": "never",  
    "source.organizeImports": "never"  
  }  
}
```

## **3) 적용 확인/재시작**
* 설정 적용 후 다시 저장해보세요.  
* 상황에 따라 Cursor 창 리로드/재시작이 필요할 수 있습니다.

## **4) 그래도 삭제/수정된다면(추가 체크)**
* 다른 Linter/Formatter 확장(예: Prettier, ESLint 외 포매터)  
* 파일별 포맷 기본값/포매터 강제 설정(**editor.defaultFormatter**)

## **5) 파일별 포맷 기본값(editor.defaultFormatter)이 강제된 경우**
언어별로 **editor.defaultFormatter**가 지정되어 있으면, 저장 시 특정 확장이 우선 적용될 수 있습니다.

### **#확인할 설정 예시**
```json
{  
  "[javascript]": {  
    "editor.defaultFormatter": "esbenp.prettier-vscode"  
  },  
  "[typescript]": {  
    "editor.defaultFormatter": "esbenp.prettier-vscode"  
  },  
  "[json]": {  
    "editor.defaultFormatter": "esbenp.prettier-vscode"  
  }  
}
```

### **#확장별 전용 설정 예시**

**Prettier (확장 ID: esbenp.prettier-vscode)**
```json
{  
  "prettier.requireConfig": true,  
  "prettier.disableLanguages": ["javascript", "typescript"]  
}
```

**ESLint (확장 ID: dbaeumer.vscode-eslint)**
```json
{  
  "editor.codeActionsOnSave": {  
    "source.fixAll.eslint": "never"  
  },  
  "eslint.format.enable": false  
}
```

## **6) 빠른 확인용 체크리스트**

| 점검 항목 | 확인 여부 |
| :---- | :---- |
| `.vscode/settings.json`가 프로젝트 루트에 있음 | □ |
| `editor.formatOnSave`가 false | □ |
| 언어별 `editor.defaultFormatter` 강제 여부 확인 | □ |
