import { Toast } from 'primereact/toast';
import { useRef } from 'react'

export const useAlerts = () => {
    const toast = useRef<Toast>(null);

    const show = (est:string) => {
      toast.current?.show({  detail:est, life: 2000});
    };

    return { show , toast}
}