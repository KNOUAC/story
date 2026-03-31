---
layout: default
title: "[Expo Application Services] eas.json 빌드 프로필 정의"
---

## **eas.json 3단 콤보 구성**
하나의 eas.json 안에 **개발, 테스트, 출시용** 3가지를 세트로 만들어 두고 우려먹자.

```json
{
  "build": {
    // 1. 개발용 프로필 (핫 리로드 껍데기)
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    
    // 2. 테스트용 프로필 (핫 리로드 없이 지인들에게 카톡으로 보내줄 독립된 APK)
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    
    // 3. 출시용 프로필 (구글 플레이스토어 심사용 AAB 파일)
    "production": {
      // production은 기본값이 스토어용 AAB라서 따로 뭘 안 적어도 된다
    }
  }
}
```

## **필요할 때 명령어만 골라서 굽기**
파일을 위처럼 한 번만 셋팅해 두면, 앞으로 터미널에서 --profile 뒤에 이름만 바꿔서 명령을 내리면 된다.

#### **👨‍💻 내 폰에서 핫 리로드로 개발할 때**
```bash
eas build --profile development --platform android
```
#### **👯‍♂️ 친구들에게 테스트용으로 뿌릴 때**
```bash
eas build --profile preview --platform android
```
#### **🚀 플레이스토어에 정식 출시할 때**
```bash
eas build --profile production --platform android
```

Expo 서버는 이 명령어를 보고 "아하, eas.json에서 development(또는 preview) 규칙을 찾아서 그대로 구워주면 되겠군!" 하고 알아서 처리한다.  
