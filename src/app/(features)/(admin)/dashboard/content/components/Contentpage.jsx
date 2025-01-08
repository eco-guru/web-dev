"use client"

import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import DataChart from "../../../components/dataChart";
import { Line } from 'react-chartjs-2';
import { useRouter } from "next/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function ContentPage() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Okt', 'Nov', 'Des'];
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  const [totalArticle, setTotalArticle] = useState();
  const [totalVideo, setTotalVideo] = useState();
  const [totalViewsArticle, setTotalViewsArticle] = useState();
  const [totalViewsVideo, setTotalViewsVideo] = useState();
  const [popular, setPopular] = useState();
  const [fluctuation, setFluctuation] = useState();
  const [newestArticle, setNewestArticle] = useState();
  const [newestVideo, setNewestVideo] = useState();
  const [token, setToken] = useState();
  const [userStatus, setUserStatus] = useState();
  const router = useRouter();

  const checkUser = async () => {
    const response = await fetch('/api/checkUser/auth', { method: "GET" });
    const authentication = await response.json();

    if(!authentication.login) {
      return router.push('/signin');
    } else {
      setUserStatus(authentication.user);
    }
  }
  
  useEffect(() => {
    const checkMiddleware = () => {
      if(userStatus) {
        if(userStatus === 'wastecoll') router.push('/transaction')
        else fetchData();
      } else {
        checkUser();
      }
    }
    checkMiddleware();
  }, [userStatus]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/dashboard/content", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Content data");
      }

      const data = await response.json();

      console.log(data);
      setTotalArticle(data.data.totalArticle);
      setTotalViewsArticle(data.data.totalViewersArticles);
      setTotalVideo(data.data.totalVideo);
      setTotalViewsVideo(data.data.totalViewsVideo);
      setPopular({
        video: data.data.popularVideo,
        article: data.data.popularArticle
      });
      setFluctuation(data.data.fluctuationContent);
      setNewestArticle(data.data.newestArticle);
      setNewestVideo(data.data.newestVideo);
    } catch (error) {
      console.error(error);
    }
  };

  const setWasteTypeByMonthsSettings = (graphData) => {
    const wasteType = [...new Set(graphData.map(item => item.waste_type))];
    setWasteTypes(wasteType);

    const dataPerWasteType = wasteType.map(type => months.map((_, index) => {
      const data = graphData.find(item => parseInt(item.month) === index + 1 && item.waste_type === type);
      return data ? data.total_quantity : 0;
    }));
    setWasteTypeByMonths(dataPerWasteType);
    
  }

  useEffect(() => {
    const tokenValue = Cookies.get("token");
    setToken(tokenValue);
    checkUser();
  }, []);

  if(
    totalViewsArticle !== undefined 
    && totalArticle !== undefined 
    && totalVideo !== undefined 
    && totalViewsVideo !== undefined
    && popular !== undefined
    && fluctuation !== undefined
    && newestArticle !== undefined
    && newestVideo !== undefined
  )
    return (
      <div className="grid grid-rows-10 grid-cols-12 gap-6">
        <DataChart
          label={"Total Penayangan"}
          value={`${totalViewsArticle.toLocaleString('id-ID')}`}
          icon={"/img/admin/views.svg"}
          parentStyle="col-span-4 px-8"
          childStyle="gap-7"
        />
        <DataChart
          label={"Total Penonton"}
          value={`${totalViewsVideo.toLocaleString('id-ID')}`}
          icon={"/img/admin/two-people.svg"}
          parentStyle="col-span-4 px-8"
          childStyle="gap-7"
        />
        <div className="row-span-4 col-span-4 border-[3px] border-[#E5E9F1] rounded-lg chart px-[28px] py-[19px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px]">
            <h1 className="font-bold text-lg">Video terbaru</h1>
            <div className="bg-cover flex flex-col justify-end h-48 bg-no-repeat rounded-lg overflow-hidden" style={{ backgroundImage: `url(${newestVideo.thumbnail_url})` }}>
                <h1 className="font-semibold text-white text-xs py-[6px] px-[10px] bg-gradient-to-b from-[rgba(217,217,217,0.4)] to-[rgba(0,0,0,0.4)]">{newestVideo.title}</h1>
            </div>
            <div className="flex flex-row justify-between">
              <p>Penayangan</p>
              <p>{`${newestVideo.views.toLocaleString('id-ID')}`}</p>
            </div>
          </div>
          <div className="flex flex-col gap-[16px]">
            <h1 className="font-bold text-lg">Artikel terbaru</h1>
            <div className="bg-cover flex flex-col justify-end h-48 bg-no-repeat rounded-lg overflow-hidden" style={{ backgroundImage: `url(${newestArticle.thumbnail_url})` }}>
                <h1 className="font-semibold text-white text-xs py-[6px] px-[10px] bg-gradient-to-b from-[rgba(217,217,217,0.4)] to-[rgba(0,0,0,0.4)]">{newestArticle.title}</h1>
            </div>
            <div className="flex flex-row justify-between">
              <p>Penayangan</p>
              <p>{`${newestArticle.views.toLocaleString('id-ID')}`}</p>
            </div>
          </div>  
        </div>
        <DataChart
          label={"Jumlah artikel diunggah"}
          value={totalArticle.toLocaleString('id-ID')}
          icon={"/img/admin/article-new-version.svg"}
          parentStyle="col-span-4 px-8"
          childStyle="gap-7"
        />
        <DataChart
          label={"Jumlah video diunggah"}
          value={`${totalVideo.toLocaleString('id-ID')}`}
          icon={"/img/admin/video-new-version.svg"}
          parentStyle="col-span-4 px-8"
          childStyle="gap-7"
        />
        <div className="row-span-2 col-span-8 border-[3px] border-[#E5E9F1] px-[24px] py-[31px] rounded-lg flex justify-between">
          <div className="flex flex-col gap-[16px] border-r-[#E5E9F1] border-r-2 pr-9">
            <h1 className="font-bold text-lg">Video terpopuler</h1>
            <div className="bg-cover w-72 h-48 flex flex-col justify-end bg-no-repeat rounded-lg overflow-hidden" style={{ backgroundImage: `url(${popular.video.thumbnail_url})` }}>
                <h1 className="font-semibold text-white text-xs py-[6px] px-[10px] bg-gradient-to-b from-[rgba(217,217,217,0.4)] to-[rgba(0,0,0,0.4)]">{popular.video.title}</h1>
            </div>
            <div className="flex flex-row justify-between">
              <p>Penayangan</p>
              <p>{`${popular.video.views.toLocaleString('id-ID')}`}</p>
            </div>
          </div>
          <div className="flex flex-col gap-[16px] border-l-[#E5E9F1] border-l-2 pl-9">
            <h1 className="font-bold text-lg">Artikel terpopuler</h1>
            <div className="bg-cover flex flex-col justify-end h-48 w-72 bg-no-repeat rounded-lg overflow-hidden" style={{ backgroundImage: `url(${popular.article.thumbnail_url})` }}>
                <h1 className="font-semibold text-white text-xs py-[6px] px-[10px] bg-gradient-to-b from-[rgba(217,217,217,0.4)] to-[rgba(0,0,0,0.4)]">{popular.article.title}</h1>
            </div>
            <div className="flex flex-row justify-between">
              <p>Penayangan</p>
              <p>{popular.article.views}</p>
            </div>
          </div>
        </div>
        <div className="row-span-6 col-span-12 h-max border-[3px] border-[#E5E9F1] bg-[#F4F4F4] px-[24px] py-[31px] rounded-lg flex flex-col">
          <div className="flex flex-row items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center w-full gap-10">
              <h1 className="font-bold text-lg">Penayangan</h1>
              <h1 className="font-bold text-lg">{`${totalViewsArticle.toLocaleString('id-ID')}`}</h1>
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-10">
              <h1 className="font-bold text-lg">Penonton</h1>
              <h1 className="font-bold text-lg">{`${totalViewsVideo.toLocaleString('id-ID')}`}</h1>
            </div>
          </div>
          <Line
            data={{
              labels: months.slice(start, end + 1),
              datasets: [
                {
                  label: 'Sampah Terkumpul',
                  data: Object.entries(fluctuation).filter(([key, value]) => {
                    return Number(
                      key.split('-')[0]) === new Date().getFullYear() 
                        && ((
                              Number(
                                Number(key.split('-')[1].split('')[0]) > 0 
                                  ? key.split('-')[1].split('')[0]
                                  : key.split('-')[1].slice(-1)
                              )) - 1) >= start 
                        && ((
                              Number(
                                Number(key.split('-')[1].split('')[0]) > 0 
                                  ? key.split('-')[1].split('')[0]
                                  : key.split('-')[1].slice(-1)
                              )) - 1) <= end
                    })
                      .map(([key, value]) => value.views),
                  fill: true,
                  backgroundColor: 'rgba(46, 125, 50, 0.2)',
                  borderColor: 'rgba(46, 125, 50, 1)',
                },
              ],
            }}
            options={{
              plugins: { legend: { display: false } },
              scales: {
                x: {
                  grid: {
                    display: false,
                    color: "black"
                  },
                  ticks: {
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0,
                    padding: 10,
                    color: 'black'
                  }
                },
                y: {
                  min: 0,
                  position: 'right',
                  grid: {
                    color: "black",
                    drawBorder: false, 
                    drawOnChartArea: true,
                    drawTicks: false,
                  },
                  ticks: {
                    padding: 20,
                    color: 'black'
                  }
                }
              },
            }}
          />
        </div>
      </div>
    );
  else
    return <div>Loading...</div>
}
