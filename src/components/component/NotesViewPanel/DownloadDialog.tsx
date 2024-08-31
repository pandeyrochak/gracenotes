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
import html2canvas from "html2canvas";

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
    const pdf = new jsPDF();

    // Create a temporary div to render the note content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = currentNote.content;
    tempDiv.style.width = "700px"; // Set a fixed width
    tempDiv.style.padding = "20px";
    tempDiv.style.boxSizing = "border-box";
    tempDiv.style.fontFamily = "Arial, sans-serif";
    tempDiv.style.fontSize = "12px";
    tempDiv.style.lineHeight = "1.5";
    tempDiv.style.whiteSpace = "pre-wrap"; // Preserve whitespace and line breaks
    document.body.appendChild(tempDiv);

    try {
      const canvas = await html2canvas(tempDiv, {
        scale: 2, // Increase resolution
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");

      // Calculate the number of pages
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageCount = Math.ceil(pdfHeight / pageHeight);

      // Add image to PDF, creating new pages as needed
      let heightLeft = pdfHeight;
      let position = 0;
      for (let i = 0; i < pageCount; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;
      }

      pdf.save(`${currentNote.title}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      document.body.removeChild(tempDiv);
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
