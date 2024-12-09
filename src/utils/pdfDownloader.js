import axios from "axios";

const generateAndDownloadPDF = async (data) => {
  try {
    // Send POST request to API
    const response = await axios.post("/generate-pdf", data, {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob", // Handle binary response
    });

    // Create a Blob from the response data
    const blob = new Blob([response.data], { type: "application/pdf" });

    // Create a download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Project_Charter_${data.id}.pdf`; // Set the file name
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    console.log("PDF downloaded successfully!");
  } catch (error) {
    console.error("Error generating or downloading the PDF:", error);
    alert("Failed to generate or download the PDF. Please try again.");
  }
};

export default generateAndDownloadPDF;