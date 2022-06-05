export interface Constructor {
  items: (string | NodeListOf<HTMLElement>),
  defaultType?: 'fade-in' | 'slide-from-bottom',
  defaultDelay?: number,
  defaultDuration?: number,
  defaultOffset?: string,
}

export interface State {
    start: string,
    wait: string,
    run: string,
    end: string,
}
