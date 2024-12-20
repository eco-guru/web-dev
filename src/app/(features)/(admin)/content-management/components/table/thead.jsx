import Color from "../../../const/color";
import Th from "./th";

export default function Thead() {
  return (
    <thead style={{ backgroundColor: Color.primary, color: "white" }}>
      <tr>
        <Th>Thumbnail</Th>
        <Th>Judul</Th>
        <Th>Tanggal</Th>
        <Th>Penayangan</Th>
        <Th>Kategori</Th> 
        <Th>Urutan Konten</Th>
        <Th>Aksi</Th>
      </tr>
    </thead>
  );
}
