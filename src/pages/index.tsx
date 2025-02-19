import React, { useEffect, useMemo } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import Banner, { BannerResult } from '@/components/anime/banner';
import progressBar from '@/components/shared/loading';
import { IAnimeResult } from '@consumet/extensions/dist/models/types';
import { TYPE, FORMAT, SORT } from '@/utils/config';
import RecentRelease from '@/components/anime/recentRelease';
import { TitleType } from '@/src/../types/types';
import Popular from '@/components/anime/popular';
import { getSeason } from '../utils';
import { useDispatch, useSelector } from '@/store/store';
import { resetStates } from '@/store/watch/slice';
import Row from '@/components/anime/row';
import useMedia from '@/hooks/useMedia';
import Genres from '@/components/anime/genres';
import { LoadingBanner } from '@/components/shared/loading';
import AiringScheduling from '@/components/anime/airing-schedule';
import DefaultLayout from '@/components/layouts/default';
import ClientOnly from '@/components/shared/client-only';

export interface IRecentResults extends IAnimeResult {
  episodeNumber: number;
  image: string;
  title: TitleType;
  color: string;
  episodeId: string;
}

const HomePage = () => {
  progressBar.finish();
  const watchList = useSelector(store => store.watch.watchList);
  const dispatch = useDispatch();
  const currentSeason = useMemo(getSeason, []);

  const { data: trendingAnime, isLoading: trendingAnimeLoading } = useMedia({
    type: TYPE.ANIME,
    page: 1,
    perPage: 12,
    season: currentSeason.season,
    format: FORMAT.TV,
    sort: SORT.TRENDING_DESC,
  });

  const { data: popularThisSeason, isLoading: popularSeasonLoading } = useMedia(
    {
      type: TYPE.ANIME,
      page: 1,
      perPage: 5,
      season: currentSeason.season,
      format: FORMAT.TV,
      sort: SORT.POPULARITY_DESC,
      year: currentSeason.year,
    }
  );

  const { data: popularAnime, isLoading: popularAnimeLoading } = useMedia({
    type: TYPE.ANIME,
    page: 1,
    perPage: 10,
    format: FORMAT.TV,
    sort: SORT.POPULARITY_DESC,
  });

  const { data: favouritesThisSeason, isLoading: favouritesSeasonLoading } =
    useMedia({
      type: TYPE.ANIME,
      page: 1,
      perPage: 5,
      format: FORMAT.TV,
      sort: SORT.FAVORITES_SEASON,
      season: currentSeason.season,
      year: currentSeason.year,
    });

  const { data: favouritesAnime, isLoading: favouritesAnimeLoading } = useMedia(
    {
      type: TYPE.ANIME,
      page: 1,
      perPage: 5,
      format: FORMAT.TV,
      sort: SORT.FAVORITES_SEASON,
    }
  );

  useEffect(() => {
    localStorage.setItem('recent', JSON.stringify(watchList));
  }, [watchList]);

  useEffect(() => {
    dispatch(resetStates());
  }, [dispatch]);

  return (
    <ClientOnly>
      <DefaultLayout>
        <div className="w-full h-full bg-center bg-top overflow-hidden bg-cover px-0 md:px-[6%]">
          {!trendingAnimeLoading ? (
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
              className="mySwiper"
            >
              {trendingAnime?.results?.map((anime, idx) => (
                <SwiperSlide key={idx}>
                  <Banner animeList={anime as BannerResult} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <LoadingBanner />
          )}
        </div>
        <main className="mt-[40px] px-[4%] md:px-[6%]">
          <div className="flex flex-col space-y-6 md:grid lg:grid-cols-1 xl:grid-cols-[1fr_310px] 2xl:grid-cols-[1fr_340px] md:gap-4">
            <div className="space-y-6">
              <RecentRelease title="Recent Updated" />
              <div className="flex flex-col md:flex-row gap-2">
                <Row
                  season={currentSeason.season}
                  animeList={popularThisSeason}
                  title="Popular this season"
                  isLoading={popularSeasonLoading}
                />
                <Row
                  season={currentSeason.season}
                  animeList={favouritesThisSeason}
                  title="Favorite this season"
                  isLoading={favouritesSeasonLoading}
                />
                <Row
                  season={currentSeason.season}
                  animeList={favouritesAnime}
                  title="All time favorite"
                  isLoading={favouritesAnimeLoading}
                />
              </div>
              <AiringScheduling />
            </div>
            <div className="overflow-hidden">
              <Popular
                isLoading={popularAnimeLoading}
                popularSeason={popularAnime}
              />
              <Genres />
            </div>
          </div>
          {/* <Row title="Popular" anime={popular} isLoading={false} /> */}
        </main>
      </DefaultLayout>
    </ClientOnly>
  );
};

export default HomePage;
