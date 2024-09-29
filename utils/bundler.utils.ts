import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

export function bundleInput(state: [string, Dispatch<SetStateAction<string>>]): stateBundlerType {
    return {
        value: state[0],
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
            state[1](e.target.value as string);
        }
    };
}
 