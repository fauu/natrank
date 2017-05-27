export interface IViewStore {
  currentUrl: string;
  isLoading: boolean;
  showView: (params: {}) => void;
}
