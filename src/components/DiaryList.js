import React, { useEffect, useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
    { value: "latest", name: "최신 순" },
    { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
    { value: "all", name: "전체" },
    { value: "good", name: "좋은 감정만" },
    { value: "bad", name: "나쁜 감정만" },
];

/**
 * 우리 플젝에서 ControlMenu에 넘겨주는 onChange는 전부 useState의 상태변화 함수(set~)이다.
 * useState가 반환하는 상태변화 함수는 리렌더 되어도 동일한 id를 보장하기 때문에, useCallback처리가 된 상태라고 생각하면 된다.
 * 만약 useState가 반환하는 상태변화 함수가 아니라,
 * ()=>{setState(~~)} 를 onChange로 받았다면, 컴포넌트 재생성시에 다시 생성하게 되어, React.memo가 의미가 없게 된다.
 * 따라서, 굳이 중간에 handler함수를 만들 필요가 없는 경우에는, 그냥 useState의 상태변화 함수를 사용하자.
 */
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
    return (
        <select
            className="ControlMenu"
            value={value}
            onChange={e => onChange(e.target.value)}
        >
            {optionList.map((it, idx) => (
                <option
                    value={it.value}
                    key={idx}
                >
                    {it.name}
                </option>
            ))}
        </select>
    );
});

const DiaryList = ({ diaryList }) => {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState("latest");
    const [filter, setFilter] = useState("all");

    const getProcessedDiaryList = () => {
        const filterCallback = item => {
            if (filter === "good") {
                return parseInt(item.emotion) <= 3;
            } else {
                return parseInt(item.emotion) > 3;
            }
        };

        const compare = (a, b) => {
            if (sortType === "latest") {
                return parseInt(b.date) - parseInt(a.date);
            } else return parseInt(a.date) - parseInt(b.date);
        };

        const copyList = JSON.parse(JSON.stringify(diaryList)); //깊은 복사

        const filteredList = filter === "all" ? copyList : copyList.filter(it => filterCallback(it));

        const sortedList = filteredList.sort(compare);
        return sortedList;
    };

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu
                        value={sortType}
                        onChange={setSortType}
                        optionList={sortOptionList}
                    />
                    <ControlMenu
                        value={filter}
                        onChange={setFilter}
                        optionList={filterOptionList}
                    />
                </div>
                <div className="right_col">
                    <MyButton
                        text={"새 읽기 쓰기"}
                        type={"positive"}
                        onClick={() => navigate("/new")}
                    />
                </div>
            </div>
            {getProcessedDiaryList().map(it => (
                <DiaryItem
                    key={it.id}
                    {...it}
                />
            ))}
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
};
export default DiaryList;
