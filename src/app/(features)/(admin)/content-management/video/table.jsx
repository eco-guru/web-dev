import { useState, useEffect } from "react";
import Image from "next/image";
import Color from "../../const/color";
import Td from "../components/table/td";
import Th from "../components/table/th";
import Thead from "../components/table/thead";
import {
  fetchVideos,
  deleteVideo,
  updateVideo,
} from "./service/video.service";
import { convertDate } from "@/app/service/convertDate.service";
import EditModal from "./editModal";

export default function TableVideo({ isDataUpdated }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetchVideos();
      const uniqueVideos = Array.from(
        new Set(response.map((video) => video.id))
      ).map((id) => response.find((video) => video.id === id));

      uniqueVideos.sort((a, b) => a.video_order - b.video_order);

      setVideos(uniqueVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };


  const handleEdit = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteVideo(id);
      if (response) {
        // Menghapus video dari state lokal
        setVideos((prevVideos) =>
          prevVideos.filter((video) => video.id !== id)
        );
        alert("Video deleted successfully."); // Menampilkan alert sukses
      } else {
        alert("Failed to delete video."); // Menampilkan alert gagal
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video."); // Menampilkan alert error
    }
  };

  const handleSave = (updatedVideo) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === updatedVideo.id ? updatedVideo : video
      )
    );
  };

  const updateVideoData = async (id, updatedData) => {
    try {
      const response = await updateVideo(id, updatedData);
      if (response) {
        setVideos((prevVideos) =>
          prevVideos.map((video) =>
            video.id === id
              ? { ...video, video_order: updatedData.video_order }
              : video
          )
        );
      } else {
        alert("Failed to update video order.");
      }
    } catch (error) {
      console.error("Error updating video order:", error);
      alert("Error updating video order.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [isDataUpdated]);

  return (
    <div>
      <table className="w-full table-fixed">
        <Thead>
          <tr>
            <Th>Thumbnail</Th>
            <Th>Title</Th>
            <Th>Upload Date</Th>
            <Th>Views</Th>
            <Th>Category</Th>
            <Th>Order</Th>
            <Th>Actions</Th>
          </tr>
        </Thead>
        <tbody>
          {videos?.map((video) => (
            <tr key={video.id}>
              <Td>
                <Image
                  src={video.thumbnail_url || "/img/admin/image.png"}
                  alt={video.title}
                  width={176}
                  height={114}
                />
              </Td>
              <Td>{video.title}</Td>
              <Td>{convertDate(video.upload_date)}</Td>
              <Td>24 Views</Td>{" "}
              <Td>{video.categoryId}</Td>{" "}
              <Td>
                <select
                  name="order"
                  id="order"
                  className="w-full px-3 py-2 rounded-[4px]"
                  value={video.video_order}
                  onChange={(e) => {
                    const updatedData = {
                      ...video,
                      video_order: e.target.value,
                    };
                    updateVideoData(video.id, updatedData);
                  }}
                >
                  {videos.map((videoOption) => (
                    <option
                      key={videoOption.id}
                      value={videoOption.video_order}
                    >
                      {videoOption.video_order}
                    </option>
                  ))}
                </select>
              </Td>
              <Td>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-blue-500 underline"
                    onClick={() => handleEdit(video)}
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="text-red-500 underline"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(video.id);
                    }}
                  >
                    Delete
                  </a>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditModal
        isOpen={isModalOpen}
        videoData={selectedVideo}
        closeModal={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
