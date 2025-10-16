export interface Widget {
  id: string;
  text: string;
}

export interface GetWidgetsResponse {
  widgets: Widget[];
}

export interface CreateWidgetResponse {
  id: string;
  text: string;
}

export interface UpdateWidgetResponse {
  id: string;
  text: string;
}

export interface DeleteWidgetResponse {
  success: boolean;
}
