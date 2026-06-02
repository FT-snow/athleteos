export interface OverlayPoint {
  x: number;
  y: number;
}

export interface OverlayLine {
  from: OverlayPoint;
  to: OverlayPoint;
  color?: string;
  width?: number;
}

export interface OverlayLabel {
  id: string;
  text: string;
  anchor: OverlayPoint;
  color?: string;
}

export interface OverlayCell {
  row: number;
  column: number;
  center: OverlayPoint;
  value?: number | string;
}

export interface OverlayLattice {
  rows: number;
  columns: number;
  cells: OverlayCell[];
  lines?: OverlayLine[];
  labels?: OverlayLabel[];
}
