const range = (input: number, min = 0, max = 0) => {
  if (input < min) return min;
  if (input > max) return max;
  return input;
};

export interface IOverTimeSetting {
  monthSalary: number;
  isBigSmallWeek: boolean;
}
export interface IOverTimeInput {
  startTime: number;
  endTime: number;
  workDays: number;
  restTimePerDay: number;
}

export const calculateOverTimePerWeek = ({
  startTime,
  endTime,
  workDays,
  restTimePerDay,
}: IOverTimeInput) => {
  const hourPerDay =
    Number(endTime) + 12 - Number(restTimePerDay) - Number(startTime);
  const workDayHour = hourPerDay * Math.min(Number(workDays), 5);
  const weekEndHour = hourPerDay * range(Number(workDays) - 5, 0, 2);
  return {
    hourPerDay,
    workDayHour,
    weekEndHour,
    totalHour: workDayHour + weekEndHour,
    overTimeWorkDayHour: workDayHour - 40,
    overTimeWeekEndHour: weekEndHour,
  };
};

export const getResult = (input: IOverTimeInput, setting: IOverTimeSetting) => {
  const standard = calculateOverTimePerWeek({
    startTime: 9,
    endTime: 6,
    workDays: 5,
    restTimePerDay: 1,
  });
  const current = calculateOverTimePerWeek(input);

  // const month = {
  //   hour: isBigSmallWeek?
  // }
  const { isBigSmallWeek = false } = setting;
  const monthSalary = Number(setting.monthSalary);
  return [
    {
      label: "时薪",
      standard: monthSalary / (standard.totalHour * 4),
      current: monthSalary / (current.totalHour * (isBigSmallWeek ? 2 : 4)),
      unit: "元/小时",
    },
    {
      label: "应发加班费",
      desc: "周末按2倍工资",
      current:
        (monthSalary / (standard.totalHour * 4)) *
        current.overTimeWeekEndHour *
        2 *
        (isBigSmallWeek ? 2 : 4),
      standard: 0,
      unit: "元/月",
    },
    {
      label: "周末加班",
      standard: 0,
      current: current.overTimeWeekEndHour * (isBigSmallWeek ? 2 : 4),
      unit: "小时/月",
    },
    {
      label: "工作日加班",
      standard: 0,
      current: current.overTimeWorkDayHour * 4,
      unit: "小时/月",
    },
    {
      label: "工作时长",
      standard: standard.totalHour * 4,
      current: isBigSmallWeek
        ? current.totalHour * 2 + current.workDayHour * 2
        : current.totalHour * 4,
      unit: "小时/月",
    },
    {
      label: "工作时长",
      standard: standard.hourPerDay,
      current: current.hourPerDay,
      unit: "小时/天",
    },
  ];
};

export const formatNumber = (n: number, toFixed = 0) => {
  if (typeof n === "number" || typeof n === "string") {
    let formatted = Number(n).toFixed(toFixed);
    return formatted.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return String(formatted).replace(/(\d)(?=(\d{3})+\.)/g, ",");
  }
  return "-";
};
