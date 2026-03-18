export interface FormData {
  // Step 1
  businessName: string;
  businessDesc: string;
  customers:    string;
  usp:          string;
  // Step 2
  goal:         string;
  websiteFeel:  string;
  colourTheme:  string;
  referenceSite:string;
  // Step 3
  pages:        string;
  features:     string;
  services:     string;
  // Step 4
  tagline:      string;
  photos:       string;
  logo:         string;
  // Step 5
  yourName:     string;
  phone:        string;
  email:        string;
  city:         string;
  extra:        string;
  submittedAt:  string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  waUrl?:  string;
}
