export class MapStyling {
  static readonly nodeColor: string = "#012D5A";
  static readonly edgeColor: string = "#0091FF";
  static readonly pathColor: string = MapStyling.nodeColor;
  static readonly nodeRadius: number = 10;
  static readonly edgeWidth: number = 5;
  static readonly pathWidth: number = 7;
}

export class FormStyling {
  static readonly submitColor: string = "#012D5A"; // HSV 210°, 99%, 35%
  static readonly submitHoverColor: string = "#0254A6"; // HSV 210°, 99%, 65% (+30% V)
  static readonly clearColor: string = "#B31602"; // HSV 7°, 99%, 70%
  static readonly clearHoverColor: string = "#FF2003"; // HSV 7°, 99%, 100% (+30% V)
}
