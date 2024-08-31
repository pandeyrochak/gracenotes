import axiosInstance from "@/lib/axiosInstance";
interface ResponseObject {
  success: boolean;
  data: any;
  message: string;
}
export const fetchDirectory = async () => {
  try {
    const response = await axiosInstance.get("/directory");
    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        data: null,
        message: response.data.message,
      };
    }
  } catch (err) {
    console.error("Error fetching directory:", err);
    return {
      success: false,
      data: null,
      message: "An error occurred while fetching the directory",
    };
  }
};
