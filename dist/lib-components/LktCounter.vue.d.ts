import { CounterConfig, CounterType, CounterView, ProgressConfig } from "lkt-vue-kernel";
declare const _default: import("vue").DefineComponent<CounterConfig, {
    pause: () => void;
    start: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<CounterConfig> & Readonly<{}>, {
    type: CounterType;
    progress: ProgressConfig;
    view: CounterView;
    timeout: number;
    seconds: number;
    to: Date | number;
    step: number;
    from: Date | number;
    events: import("lkt-vue-kernel").CounterEvents;
    dateFormat: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
