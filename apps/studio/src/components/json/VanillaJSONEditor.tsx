import { useEffect, useRef } from "react";
import {
  type Content,
  createJSONEditor,
  Mode,
  type OnChangeStatus,
} from "vanilla-jsoneditor";

interface VanillaJSONEditorProps {
  content: Content;
  onChange: (content: Content, hasErrors: boolean) => void;
}

export default function VanillaJSONEditor({
  content,
  onChange,
}: Readonly<VanillaJSONEditorProps>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<ReturnType<typeof createJSONEditor> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    editorRef.current = createJSONEditor({
      target: containerRef.current,
      props: {
        content,
        mode: Mode.tree,
        mainMenuBar: true,
        navigationBar: true,
        statusBar: true,
        onChange: (
          updatedContent: Content,
          _previousContent: Content,
          { contentErrors }: OnChangeStatus,
        ) => {
          onChange(updatedContent, Boolean(contentErrors));
        },
      },
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    editorRef.current?.updateProps({ content });
  }, [content]);

  return <div ref={containerRef} className="h-full min-h-0 w-full min-w-0" />;
}
