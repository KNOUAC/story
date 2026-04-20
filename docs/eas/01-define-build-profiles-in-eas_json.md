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

**👨‍💻 내 폰에서 핫 리로드로 개발할 때**
```bash
eas build --profile development --platform android
```
**👯‍♂️ 친구들에게 테스트용으로 뿌릴 때**
```bash
eas build --profile preview --platform android
```
**🚀 플레이스토어에 정식 출시할 때**
```bash
eas build --profile production --platform android
```

Expo 서버는 이 명령어를 보고 "아하, eas.json에서 development(또는 preview) 규칙을 찾아서 그대로 구워주면 되겠군!" 하고 알아서 처리한다.  
  

## **🛠️ 자동 빌드 스크립트 만들기**  
매번 명령어 붙여넣기도 귀찮으니 터미널에서 숫자만 딱 누르면 알아서 알맞은 빌드를 시작해 주는 **스크립트**도 만들어두자.  

**1) eas.json이 있는 위치에 build.sh 파일을 만들고 아래 코드 삽입**
```bash
#!/bin/bash

echo "========================================"
echo "      🚀 빌드 매니저 🚀     "
echo "========================================"
echo " 1. 개발용 (Hot Reload 껍데기 / Development)"
echo " 2. 테스트용 (지인 배포용 APK / Preview)"
echo " 3. 출시용 (스토어 배포용 AAB / Production)"
echo "========================================"
read -p "어떤 버전으로 구울까요? (1, 2, 3 중 선택): " choice

case $choice in
  1)
    echo "🛠️ [개발용] 껍데기를 굽기 시작합니다..."
    eas build --profile development --platform android
    ;;
  2)
    echo "📱 [테스트용] 독립 APK를 굽기 시작합니다..."
    eas build --profile preview --platform android
    ;;
  3)
    echo "🚀 [출시용] 플레이스토어 AAB 빌드를 시작합니다..."
    eas build --profile production --platform android
    ;;
  *)
    echo "❌ 잘못된 입력입니다. 1, 2, 3 중에서 선택해 주세요."
    exit 1
    ;;
esac
```
  
**2) 터미널을 열고 build.sh 실행 권한 부여 (Windows 명령어 프롬프트에서는 생략해도 되지만, Git Bash나 WSL을 쓴다면 입력)**
```bash
chmod +x build.sh

# 실행
./build.sh
```