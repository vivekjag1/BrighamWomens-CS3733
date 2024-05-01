export class ButtonStyling {
  static readonly blueButton: string = "#012D5A"; // HSV 210°, 99%, 35%
  static readonly blueButtonHover: string = "#0254A6"; // HSV 210°, 99%, 65% (+30% V)
  static readonly blueButtonClicked: string = "#012040"; // HSV 210°, 99%, 25% (-10% V)
  static readonly redButton: string = "#B31602"; // HSV 7°, 99%, 70%
  static readonly redButtonHover: string = "#D91B02"; // HSV 7°, 99%, 85% (+15% V)
}

export class DesignSystem {
  static readonly primaryColor: string = ButtonStyling.blueButton; // Blue
  static readonly secondaryColor: string = "#F1F1F1"; // Off-White
  static readonly tertiaryColor: string = "#F6BD39"; // Yellow
  static readonly accentColor: string = ButtonStyling.blueButtonHover;
  static readonly white: string = "#FFFFFF";
  static readonly black: string = "#000000";
  static readonly fontFamily: string = "Poppins, sans-serif";
}

export class MapStyles {
  static readonly nodeColor: string = "#012D5ACC";
  static readonly nodeRadius: number = 12;
  static readonly edgeWidth: number = 8;
}

export class MapEditStyles {
  static readonly nodeColor: string = "#012D5A";
  static readonly nodeSelectedColor: string = DesignSystem.tertiaryColor;
  static readonly edgeColor: string = "#0091FF";
  static readonly hallColor: string = MapEditStyles.edgeColor;
  static readonly nodeRadius: number = 10;
  static readonly hallRadius: number = 6;
  static readonly edgeWidth: number = 5;
}
