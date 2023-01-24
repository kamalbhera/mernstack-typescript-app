import { FC } from 'react';

import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import { useDescribeLending } from 'src/hooks/useDescribeLending';
import { QuestionType } from 'src/types/Question';
import { IAnswer } from 'src/types/Results';

import styles from './styles.module.scss';

ChartJS.register(...registerables);

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 5,
      shadowOffsetX: 1,
      shadowOffsetY: 1,
      shadowBlur: 6,
      shadowColor: 'red',
    },
  },
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        stepSize: 20,
        callback: (
          value: string | number | string[] | number[] | null | undefined,
        ) => {
          return `${value}%`;
        },
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: 'General SMS - 150',
    },
    layout: {
      padding: 50,
    },
    datalabels: {
      font: {
        weight: '900',
      },
      align: 'end',
      anchor: 'end',
    },
  },
};

interface Props {
  answer: IAnswer;
  totalResults: number;
}
export const ChartResult: FC<Props> = ({ answer, totalResults }) => {
  const lending = useDescribeLending();
  const { t } = useTranslation();
  if (!answer) return null;
  const { title, totalAnswers } = answer;

  let labels = [];
  let values = [];

  if (answer.type === QuestionType.RATING_ANSWER) {
    labels = Object.entries(answer.value).map((x: number[]) =>
      new Array(Number(x[0])).fill('★').join(''),
    );
  } else {
    labels = Object.entries(answer.value).map((x: string[]) => x[0]);
  }
  if (answer.type === QuestionType.TEXT_ANSWER) {
    values = Object.entries(answer.value).map((x: string[]) => x[1]);
  } else {
    values = Object.entries(answer.value).map((x: number[]) =>
      Math.round((x[1] / totalAnswers!) * 100),
    );
  }
  const data = {
    labels: ['', ...labels, ''],
    datasets: [
      {
        data: [null, ...values, null],
        backgroundColor: [
          '#cadab5',
          '#aab9a2',
          '#8ea672',
          '#96af9b',
          '#9fa082',
        ],
        hoverBackgroundColor: '#375541',
      },
    ],
  };

  return (
    <div className={styles.chart_wr}>
      <div className={styles.chart_title}>{title}</div>
      <div className={styles.chart_subtitle}>
        <span>
          {t('statisticsPage.answered')}:{totalAnswers}
        </span>
        <span>
          {t('statisticsPage.skipped')}: {totalResults - totalAnswers!}
        </span>
      </div>
      <div className={styles.chart_main}>
        <Bar data={data} options={options} />
      </div>
      <div className={styles.chart_description}>
        {Object.entries(answer.value).map(
          (el: (string | number)[], i: number) => {
            return (
              <div
                key={`${answer.title}${i.toString()}`}
                className={styles.chart_description_item}
              >
                <span>{el[0]}:</span>
                <span className={styles.chart_description_item_num}>
                  {Math.round(((el[1] as number) / totalAnswers!) * 100)}%
                </span>
                <span className={styles.chart_description_item_num}>
                  ({el[1]} {lending(el[1] as number)})
                </span>
              </div>
            );
          },
        )}
      </div>
      <hr />
    </div>
  );
};
