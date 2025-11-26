export enum ViewState {
  HOME = 'HOME',
  TOOL_ENS_CALC = 'TOOL_ENS_CALC',
  TOOL_ESA_CALC = 'TOOL_ESA_CALC',
  TOOL_BEST_PRACTICE = 'TOOL_BEST_PRACTICE',
  TOOL_ENA_SPEED = 'TOOL_ENA_SPEED',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface NavItem {
  label: string;
  id: string; // Simplified for this demo
}

export interface GridItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  viewTarget?: ViewState;
  large?: boolean; // For the top row items
}