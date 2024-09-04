import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNotesStore } from "@/store/useNotesStore";
import jsPDF from "jspdf";
import { jsPDF as jsPDFType } from "jspdf"; // Add this line
import html2canvas from "html2canvas";
import { marked } from "marked";
import { marked as markedType } from "marked"; // Add this line
import "jspdf-autotable";

interface DownloadNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DownloadNoteModal: React.FC<DownloadNoteModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentNote } = useNotesStore();

  const downloadAsMarkdown = () => {
    const element = document.createElement("a");
    const file = new Blob([currentNote.content], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `${currentNote.title}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    onClose();
  };

  const downloadAsPDF = async () => {
    const pdf = new jsPDF() as jsPDFType;

    try {
      // Convert Markdown to HTML
      const htmlContent = await (marked as typeof markedType)(
        currentNote.content
      );

      // Parse the HTML content
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");

      let yOffset = 10;
      const pageWidth = pdf.internal.pageSize.width;
      const margin = 10;
      const maxWidth = pageWidth - 2 * margin;

      // Function to add a new page if needed
      const checkForNewPage = (height: number) => {
        if (yOffset + height > pdf.internal.pageSize.height - margin) {
          pdf.addPage();
          yOffset = 10;
        }
      };

      // Process each element
      doc.body.childNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;

          switch (element.tagName.toLowerCase()) {
            case "h1":
            case "h2":
            case "h3":
            case "h4":
            case "h5":
            case "h6":
              const fontSize = 22 - parseInt(element.tagName.charAt(1)) * 2;
              pdf.setFont("helvetica", "bold");
              checkForNewPage(fontSize / 2);
              pdf.text(element.textContent || "", margin, yOffset);
              yOffset += fontSize / 2 + 5;
              break;

            case "p":
              pdf.setFont("helvetica", "normal");
              const lines = pdf.splitTextToSize(
                element.textContent || "",
                maxWidth
              );
              checkForNewPage(lines.length * 5);
              pdf.text(lines, margin, yOffset);
              yOffset += lines.length * 5 + 5;
              break;

            case "ul":
            case "ol":
              pdf.setFont("helvetica", "normal");
              element.querySelectorAll("li").forEach((li, index) => {
                const bullet =
                  element.tagName.toLowerCase() === "ol"
                    ? `${index + 1}.`
                    : "•";
                const text = `${bullet} ${li.textContent}`;
                const lines = pdf.splitTextToSize(text, maxWidth - 5);
                checkForNewPage(lines.length * 5);
                pdf.text(lines, margin + 5, yOffset);
                yOffset += lines.length * 5 + 2;
              });
              yOffset += 5;
              break;
          }
        }
      });

      pdf.save(`${currentNote.title}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Download Note</DialogTitle>
        </DialogHeader>
        <div className="flex justify-around mt-4">
          <Button onClick={downloadAsMarkdown}>Download as Markdown</Button>
          <Button onClick={downloadAsPDF}>Download as PDF</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadNoteModal;
