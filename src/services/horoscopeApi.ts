import axios from "axios";

export const getHoroscope =
  async (sign: string) => {
    try {
      const response =
        await axios.post(
          `https://aztro.sameerkumar.website/?sign=${sign}&day=today`
        );

      return response.data;
    } catch (error) {
      console.log(error);

      return null;
    }
  };