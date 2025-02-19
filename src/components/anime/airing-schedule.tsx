import React, { useMemo } from 'react';
import dayjs from '@/utils/time';
import TitleName from '../shared/title-name';
import useAiringSchedule from '@/hooks/useAiringSchedule';
import Link from 'next/link';
import { episodesTitle } from '@/utils/index';

const AiringScheduling = () => {
  const { data: animeAired, isLoading } = useAiringSchedule();

  const getDate = useMemo(() => {
    const date = new Date();
    const now = dayjs(date).format('LLLL');
    return now;
  }, []);

  return !isLoading ? (
    <div>
      <div className="flex md:space-x-3 items-start md:items-center md:flex-row flex-col">
        <TitleName classNames="md:mb-0" title="Estimated Schedule" />
        <span className="text-white bg-[#6a55fa] rounded-lg px-2">
          {getDate}
        </span>
      </div>
      <div className="h-[330px] overflow-auto mt-4">
        {animeAired?.map(anime => (
          <div key={anime.id} className="p-4 odd:bg-[#0d0d0d] even:bg-[#111]">
            <div className="flex justify-between w-full text-white">
              <div className="flex gap-2 items-center">
                <span className="text-slate-300 text-xs">
                  {dayjs(anime.airingAt as number).format('LTS')}
                </span>

                <Link href={`/anime/${anime.id}`}>
                  <a className="hover:text-[#6a55fa] transition text-sm md:text-base">
                    {anime.title.english || anime.title.romaji}
                  </a>
                </Link>
              </div>
              <div>
                <Link
                  href={`/watch/${anime.id}?episode=${episodesTitle(
                    anime.title.romaji
                  )}-episode-${anime.episode}`}
                >
                  <a className="bg-black flex justify-center items-center h-[35px] w-[90px] md:w-[115px] text-sm rounded hover:bg-[#6a55fa] transition">
                    {`Episode ${anime.episode}`}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default React.memo(AiringScheduling);
