// Widget type definitions for WordPress integration

export interface BaseWidgetProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface ConsultantImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface HeroWidgetProps extends BaseWidgetProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  consultantImages?: ConsultantImage[];
  rating?: number;
}

export interface WidgetMountFunction<T = any> {
  (element: HTMLElement, props: T): void;
}

export interface WidgetComponent<T = any> {
  (props: T): JSX.Element;
}

export interface WidgetExport<T = any> {
  component: WidgetComponent<T>;
  mount: WidgetMountFunction<T>;
  metadata?: {
    name: string;
    version: string;
    description?: string;
  };
}