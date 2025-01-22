"use client"

import HeroSignin from "../signin/components/hero";
import FormAuthContainer from "../components/formAuthContainer";
import { useState } from "react";

export default function PrivacyPolicy() {
    const [language, setLanguage] = useState("IN");
    return (
        <div className="overflow-y-hidden flex justify-between w-screen h-screen">
            <HeroSignin />
            <FormAuthContainer>
                <div className="w-full flex gap-4 mb-7">
                    <label htmlFor="Lang">Pilih bahasa (choose language) : </label>
                    <select id="Lang" className="w-80 h-5" value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="EN">English</option>
                        <option value="IN">Indonesia</option>
                    </select>
                </div>
                <div className={`overflow-scroll ${language === "IN" ? "flex" : "hidden"} flex-col gap-3 text-lg text-justify`}>
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
                <div className={`overflow-scroll ${language === "EN" ? "flex" : "hidden"} flex-col gap-3 text-lg text-justify`}>
                    <h1 className="text-2xl font-extrabold">Runtah Privacy Policy</h1>
                    <h6 className="text-md font-semibold">Last updated: January 22, 2025</h6>
                    <p>We, the Runtah team, are committed to protecting and respecting your privacy. This privacy policy explains how we collect, use, protect, and disclose the information you provide when using our services. Please take the time to read this policy carefully.</p>
                    <ol className="px-6 flex flex-col gap-3">
                        <li>
                            <h1 className="font-bold text-xl">1. Information We Collect</h1>
                            <p className="px-5">We collect the following information from users who register or use our services:</p>
                            <ul className="list-disc px-16">
                                <li><span className="font-bold">Email Address: </span>Used for account verification and communication.</li>
                                <li><span className="font-bold">Username: </span>Your chosen username during registration.</li>
                                <li><span className="font-bold">Password: </span>Your password is encrypted to ensure the security of your account.</li>
                                <li><span className="font-bold">Sales Balance: </span>Information about the balance earned from selling waste.</li>
                                <li><span className="font-bold">Sales History: </span>Data related to transactions you have made concerning waste sales.</li>
                                <li><span className="font-bold">Security Questions and Answers: </span>Used for account recovery purposes. If you forget your password, we will ask you to answer the security questions you selected during registration.</li>
                            </ul>
                        </li>
                        <li>
                            <h1 className="font-bold text-xl">2. Use of Your Information</h1>
                            <p className="px-5">The information we collect is used to:</p>
                            <ul className="list-disc px-16">
                                <li>Verify your identity during the registration and account recovery process.</li>
                                <li>Manage and process waste sales transactions.</li>
                                <li>Provide support and responses related to your account and transactions.</li>
                                <li>Enable account recovery if you forget your password, using the security questions and answers you set during registration.</li>
                            </ul>
                        </li>
                        <li>
                            <h1 className="font-bold text-xl">3. Information Security</h1>
                            <p className="px-5">We implement reasonable technical and organizational measures to protect your information from unauthorized access, alteration, or disclosure. Your password is stored in encrypted form to ensure its confidentiality. We also ensure that only authorized users can access your personal information.</p>
                        </li>
                        <li>
                            <h1 className="font-bold text-xl">4. Information Disclosure</h1>
                            <p className="px-5">We will not sell, rent, or disclose your personal information to third parties, except as required by this privacy policy or by law.</p>
                        </li>
                        <li>
                            <h1 className="font-bold text-xl">5. Account Recovery</h1>
                            <p className="px-5">If you forget your password, you can recover your account by entering your registered email address and answering the security questions you set during registration. Only matching answers will allow you to reset your password.</p>
                        </li>
                        <li>
                            <h1 className="font-bold text-xl">6. Changes to the Privacy Policy</h1>
                            <p className="px-5">We reserve the right to modify this privacy policy from time to time. Any changes will be published on this page with a new update date. We recommend that you check this page periodically to stay informed about any updates to this policy.</p>
                        </li>
                    </ol>
                    <a href="/signin" className="text-center text-blue-400 underline">Sign in to your account</a>
                </div>
            </FormAuthContainer>
        </div>
    );
}