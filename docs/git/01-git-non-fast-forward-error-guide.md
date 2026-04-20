---
layout: default
title: "[Git] Non-fast-forward 에러 해결 가이드"
---

```bash
git push
To https://github.com/[id]/[repo].git
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/[id]/[repo].git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

현재 상황은 원격 저장소(GitHub)에 있는 커밋들이 로컬 컴퓨터에는 없어서 발생하는 **'Non-fast-forward'** 에러입니다.    
누군가(혹은 다른 기기의 본인이) 원격에 코드를 먼저 올렸기 때문에, 현재 내 로컬 작업본이 구버전이 된 셈이죠.

단순히 `git pull`을 하기 전에, **무엇이 다른지 정확히 확인**하고 싶다면 아래 단계들을 추천합니다.

---

## 1. 원격의 최신 상태 정보를 가져오기 (`git fetch`)
차이점을 비교하려면 우선 원격 저장소의 최신 이력을 로컬로 내려받아야 합니다. `fetch`는 코드를 내 파일에 합치지 않고 정보만 업데이트합니다.

```bash
git fetch origin
```

---

## 2. 차이점 비교하기 (비교 방법 3가지)

### 방법 A: 커밋 로그로 비교 (어떤 작업들이 추가됐나?)
로컬의 `main` 브랜치와 원격의 `origin/main` 브랜치 사이에 어떤 커밋들이 있는지 목록을 보여줍니다.

```bash
git log main..origin/main --oneline --graph
```
* **의미:** "내 로컬(`main`)에는 없지만 원격(`origin/main`)에는 있는 커밋들을 한 줄씩 그려줘."

### 방법 B: 코드 변경 내용 비교 (구체적으로 뭐가 바뀌었나?)
어떤 파일의 어떤 줄이 수정되었는지 소스 코드 단위로 비교합니다.

```bash
git diff main origin/main
```

### 방법 C: 시각적으로 확인하기 (강력 추천)
브랜치 상황을 한눈에 보고 싶다면 아래 명령어를 사용해 보세요.

```bash
git log --all --decorate --oneline --graph
```



---

## 3. 확인 후 해결 방법

내용을 확인했고, 원격의 변경 사항을 받아들여도 괜찮다고 판단되면 아래 중 하나를 선택하세요.

1.  **가장 깔끔한 방법 (Rebase):** 내 작업 내용을 원격의 최신 작업 뒤로 이어 붙입니다. 히스토리가 한 줄로 관리되어 깔끔합니다.
    ```bash
    git pull --rebase origin main
    ```
2.  **기본 방법 (Merge):** 원격의 내용과 내 내용을 합치는 새로운 'Merge commit'을 만듭니다.
    ```bash
    git pull origin main
    ```

**참고:** 만약 원격의 코드가 완전히 잘못되었고 내 로컬 코드가 무조건 맞다면 `git push -f`로 강제 덮어쓰기를 할 수도 있지만, 협업 중이라면 절대 권장하지 않습니다.
