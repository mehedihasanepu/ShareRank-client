import useAnnouncement from "../../../hook/useAnnouncement";
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './announcement.css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';



const Announcement = () => {
    const { announcements } = useAnnouncement();
    console.log(announcements.length);

    const progressCircle = useRef(null);
    const progressContent = useRef(null);

    const onAutoplayTimeLeft = (s, time, progress) => {
        // Safeguard against null references before accessing their properties
        if (progressCircle.current && progressContent.current) {
            progressCircle.current.style.setProperty('--progress', 1 - progress);
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    };
    return (
        <div className='max-w-screen-xl mx-auto my-10' id="announcement">
            {
                announcements.length > 0

                    ?

                    <div>

                        <div className="mx-auto text-center md:w-4/12 mt-20">
                            <h3 className="text-3xl uppercase font-semibold border-y-4 border-blue-100 py-4 text-blue-900">Announcements</h3>
                        </div>
                        <div className='h-[50vh] md:h-[34vh] lg:h-[45vh]'>
                            <Swiper
                                spaceBetween={30}
                                centeredSlides={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={true}
                                modules={[Autoplay, Pagination, Navigation]}
                                onAutoplayTimeLeft={onAutoplayTimeLeft}
                                className="mySwiper"
                            >

                                {announcements.map((announcement) => (
                                    <SwiperSlide className='pt-20' key={announcement._id}>
                                        <div className='w-8/12'>
                                            <h3 className="text-[22px] font-semibold">{announcement.title}</h3>
                                            <p className='text-gray-500 text-[16px] leading-7 pt-2'>{announcement.descriptions.slice(0, 230)}</p>
                                            <h3 className='mt-8 text-lg font-semibold'>{announcement.postTime.slice(0, 10)}</h3>
                                        </div>
                                    </SwiperSlide>
                                ))}
                                <div className="autoplay-progress" slot="container-end">
                                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                                        <circle cx="24" cy="24" r="20"></circle>
                                    </svg>
                                    <span ref={progressContent}></span>
                                </div>
                            </Swiper>
                        </div>
                    </div>

                    : ''

            }

        </div>
    );
};

export default Announcement;