import HeroSignin from "../signin/components/hero";
import FormAuthContainer from "../components/formAuthContainer";

export default function PrivacyPolicy() {
    return (
        <div className="overflow-y-hidden flex justify-between w-screen h-screen">
            <HeroSignin />
            <FormAuthContainer>
                <div className="overflow-scroll flex flex-col gap-3 text-lg text-justify">
                    <h1 className="text-2xl font-extrabold">Kebijakan Privasi Runtah</h1>
                    <h6 className="text-md font-semibold">Pembaruan terakhir: 22 Januari 2025</h6>
                    <p>Kami, tim Runtah, berkomitmen untuk melindungi dan menghargai privasi Anda. Kebijakan privasi ini menjelaskan cara kami mengumpulkan, menggunakan, melindungi, dan mengungkapkan informasi yang Anda berikan saat menggunakan layanan kami. Harap luangkan waktu untuk membaca kebijakan ini dengan seksama.</p>
                    <ol className="px-6 flex flex-col gap-3">
                        <li>
                            <h1 className="font-bold text-xl">1. Informasi yang Kami Kumpulkan</h1>
                            <p className="px-5">Kami mengumpulkan informasi berikut dari pengguna yang mendaftar atau menggunakan layanan kami:</p>
                            <ul className="list-disc px-16">
                                <li><span className="font-bold">Alamat Email : </span>Digunakan untuk proses verifikasi dan komunikasi terkait akun Anda.</li>
                                <li><span className="font-bold">Username : </span>Nama pengguna yang Anda pilih saat registrasi.</li>
                                <li><span className="font-bold">Password : </span>Kata sandi yang dienkripsi untuk menjaga keamanan akun Anda.</li>
                                <li><span className="font-bold">Saldo Penjualan sampah : </span>Informasi tentang saldo yang diperoleh melalui transaksi penjualan sampah.</li>
                                <li><span className="font-bold">Riwayat Penjualan sampah : </span>Data terkait transaksi yang telah Anda lakukan terkait dengan penjualan sampah.</li>
                                <li><span className="font-bold">Pertanyaan dan Jawaban Keamanan : </span>Untuk tujuan pemulihan akun, jika Anda lupa kata sandi, kami akan meminta Anda untuk menjawab pertanyaan keamanan yang Anda pilih saat registrasi.</li>
                            </ul>
                        </li>
                        <li>
                            <h1 className="font-bold text-xl">2. Penggunaan informasi anda</h1>
                            <p className="px-5">Informasi yang kami kumpulkan digunakan untuk:</p>
                            <ul className="list-disc px-16">
                                <li>Memverifikasi identitas Anda selama proses registrasi dan pemulihan akun.</li>
                                <li>Mengelola dan memproses transaksi penjualan sampah.</li>
                                <li>Memberikan dukungan dan respons terkait akun dan transaksi Anda.</li>
                                <li>Menyediakan fitur pemulihan akun jika Anda lupa kata sandi dengan menggunakan pertanyaan dan jawaban yang Anda tentukan selama registrasi.</li>
                            </ul>
                        </li>
                        <li>
                            <h1 className="font-bold text-xl">3. Keamanan informasi </h1>
                            <p className="px-5">Kami menggunakan langkah-langkah teknis dan organisasi yang wajar untuk melindungi informasi Anda dari akses yang tidak sah, perubahan, atau pengungkapan. Password Anda disimpan dalam bentuk yang dienkripsi untuk memastikan kerahasiaannya. Kami juga memastikan bahwa hanya pengguna yang berwenang yang dapat mengakses informasi pribadi Anda.</p>
                        </li>
                        <li>
                            <h1 className="font-bold text-xl">4. Pengungkapan informasi </h1>
                            <p className="px-5">Kami tidak akan menjual, menyewakan, atau mengungkapkan informasi pribadi Anda kepada pihak ketiga, kecuali untuk kepentingan yang diatur dalam kebijakan privasi ini, atau jika diwajibkan oleh hukum.</p>
                        </li>
                        <li>
                            <h1 className="font-bold text-xl">5. Pemulihan akun </h1>
                            <p className="px-5">Jika Anda lupa kata sandi Anda, Anda dapat melakukan pemulihan akun dengan memasukkan alamat email yang terdaftar dan menjawab pertanyaan keamanan yang telah Anda pilih saat registrasi. Hanya jawaban yang sesuai yang akan mengizinkan Anda untuk mengatur ulang kata sandi Anda.</p>
                        </li>
                        <li>
                            <h1 className="font-bold text-xl">6. Perubahan kebijakan privasi</h1>
                            <p className="px-5">Kami berhak untuk mengubah kebijakan privasi ini dari waktu ke waktu. Setiap perubahan akan dipublikasikan di halaman ini dengan tanggal pembaruan yang baru. Kami menyarankan Anda untuk memeriksa halaman ini secara berkala agar tetap terinformasi mengenai perubahan kebijakan privasi yang mungkin terjadi.</p>
                        </li>
                    </ol>
                    <a href="/signin" className="text-center text-blue-400 underline">Masuk ke akun anda</a>
                </div>
            </FormAuthContainer>
        </div>
    );
}