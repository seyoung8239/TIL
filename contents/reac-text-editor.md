---
title: Next.js 프로젝트에 텍스트 에디터 추가하기
createdAt: 2023-04-21
summary: Next.js 프로젝트에서 다양한 텍스트 에디터 사용해보기
categories: [next, text editor]
---
## 테스트 환경

- node: 18.15.13
- next: 13.3.0
- react: 18.2.0

## 텍스트 에디터

### Quill

```json
"dependencies": {
	"quill": "^1.3.7",
	"react-quill": "^2.0.0",
}
```

```jsx
import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Quill = () => {
    const [text, setText] = useState("");

    return <ReactQuill theme="snow" value={text} onChange={setText} />;
};

export default Quill;
```

- `quill`은 내부적으로 `document` 객체에 접근하기 때문에 클라이언트 사이드에서만 사용해야 한다.
    - `next`의 `dynamic import` + `ssr: false`옵션을 사용해야 한다.
- css를 따로 반드시 import 해 주어야 한다.

### draft-js

```json
"dependencies": {
	"draft-js": "^0.11.7",
	"react-draft-wysiwyg": "^1.15.0",
}
```

```jsx
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";

const Editor = dynamic(
    async () => (await import("react-draft-wysiwyg")).Editor,
    { ssr: false }
);

const DraftEditor = () => {
    const [text, setText] = useState(() => EditorState.createEmpty());
    useEffect(() => {}, []);
    return <Editor editorState={text} onEditorStateChange={setText} />;
};

export default DraftEditor;
```

- `draft` 에디터 컴포넌트를 `dynamic import`한다
- `react-draft-wysiwyg` api의 스펙에 맞게 초기화한다.

### @toast-ui/react-editor
```jsx
import React from "react";
import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";

const Editor = dynamic(
    () => import("@toast-ui/react-editor").then((tui) => tui.Editor),
    { ssr: false }
);

const Tui = () => {
    return (
        <Editor
            initialValue="hello react editor world!"
            previewStyle="vertical"
            height="200px"
            initialEditType="wysiwyg"
        />
    );
};

export default Tui;
```