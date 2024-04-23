export class DesignSystem {
  static readonly primaryColor: string = "#012D5A"; // Medically Blue
  static readonly secondaryColor: string = "#F1F1F1"; // Off-White
  static readonly tertiaryColor: string = "#F6BD39"; // Yellow
  static readonly accentColor: string = "#013280";
  static readonly white: string = "#FFFFFF";
  static readonly black: string = "#000000";
  static readonly fontFamily: string = "Poppins, sans-serif";
}

export class MapStyling {
  static readonly nodeColor: string = "#012D5A";
  static readonly clickableNodeColor: string = "#012D5AE6";
  static readonly edgeColor: string = "#0091FF";
  static readonly pathColor: string = MapStyling.nodeColor;
  static readonly nodeRadius: number = 10;
  static readonly edgeWidth: number = 5;
  static readonly pathWidth: number = 7;
}

export class ButtonStyling {
  static readonly blueButton: string = "#012D5A"; // HSV 210°, 99%, 35%
  static readonly blueButtonHover: string = "#0254A6"; // HSV 210°, 99%, 65% (+30% V)
  static readonly blueButtonClicked: string = "#012040"; // HSV 210°, 99%, 25% (-10% V)
  static readonly redButton: string = "#B31602"; // HSV 7°, 99%, 70%
  static readonly redButtonHover: string = "#FF2003"; // HSV 7°, 99%, 100% (+30% V)
}
