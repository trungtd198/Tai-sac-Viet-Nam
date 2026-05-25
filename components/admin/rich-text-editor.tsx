"use client";

import { useRef, useState } from "react";
import { Bold, Italic, LinkIcon, List } from "lucide-react";
import { Button } from "@/components/ui/button";

type RichTextEditorProps = {
  name: string;
  defaultValue?: string;
};

export function RichTextEditor({ name, defaultValue = "" }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(defaultValue);

  function runCommand(command: string, commandValue?: string) {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    setValue(editorRef.current?.innerHTML || "");
  }

  function addLink() {
    const url = window.prompt("Nhập URL liên kết");
    if (!url) return;
    runCommand("createLink", url);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background">
      <div className="flex flex-wrap gap-2 border-b border-border bg-muted/60 p-2">
        <Button type="button" variant="ghost" size="sm" onClick={() => runCommand("bold")}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => runCommand("italic")}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => runCommand("insertUnorderedList")}>
          <List className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={addLink}>
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="prose prose-sm min-h-[320px] max-w-none px-4 py-3 text-sm leading-7 outline-none"
        onInput={(event) => setValue(event.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: defaultValue }}
      />
      <input type="hidden" name={name} value={value} />
    </div>
  );
}
