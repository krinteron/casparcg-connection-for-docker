import { AMCPCommand } from './commands';
type Serializers<C extends AMCPCommand> = {
    [command in C as command['command']]: Array<(c: command['command'], p: command['params']) => string>;
};
export declare const serializers: Readonly<Serializers<AMCPCommand>>;
export declare const serializersV21: Readonly<Serializers<AMCPCommand>>;
export {};
//# sourceMappingURL=serializers.d.ts.map