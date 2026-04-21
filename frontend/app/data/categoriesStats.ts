export const statisticsOfCategories = [
    { name: "Оборудование", value: 2 },
    { name: "Сеть", value: 1 },
    { name: "ПО", value: 3 },
];

const maxValue = Math.max(...statisticsOfCategories.map((c) => c.value));
export const getPercent = (value: number) => {
    if (!maxValue) return 0;
    return (value / maxValue) * 100 + "%";
};
