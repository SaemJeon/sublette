// import AutoAddressField from "../components/AutoAddressField";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { addDoc, collection, setDoc, doc, updateDoc } from "firebase/firestore";
import { dbService, authService, storage } from "../fbase";
import { ref, uploadBytes } from "firebase/storage";
import styles from "../css/AddSublet.module.css";
import { style } from "@mui/system";

const AddSublet = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [price, setPrice] = useState(0);
  const [negotiable, setNegotiable] = useState(false);
  const [pet, setPet] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [bedroom, setBedroom] = useState(1);
  const [bathroom, setBathroom] = useState(1);
  const [detail, setDetail] = useState("");
  const [images, setImages] = useState([]);
  const [geo, setGeo] = useState([]);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  // const ref = useOnclickOutside(() => {
  //   // When user clicks outside of the component, we can dismiss
  //   // the searched suggestions by calling this method
  //   clearSuggestions();
  // });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log("???? Coordinates: ", { lat, lng });
          setGeo([lat, lng]);
        })
        .catch((error) => {
          console.log("???? Error: ", error);
        });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  async function handleSubmit() {
    // console.log(price);
    // console.log(negotiable);
    // console.log(pet);
    // console.log(furnished);
    // console.log(bedroom);
    // console.log(bathroom);
    // console.log(detail);
    // console.log(images);
    // console.log(geo);

    try {
      const uid = authService.currentUser.uid;

      const convertedFrom = new Date(fromDate);
      const formattedFrom =
        convertedFrom.getMonth() +
        1 +
        "/" +
        convertedFrom.getDate() +
        "/" +
        convertedFrom.getFullYear();

      console.log(formattedFrom);

      const convertedTo = new Date(toDate);
      const formattedTo =
        convertedTo.getMonth() +
        1 +
        "/" +
        convertedTo.getDate() +
        "/" +
        convertedTo.getFullYear();

      console.log(formattedTo);

      const docRef = await addDoc(collection(dbService, "listings"), {
        value,
        price,
        negotiable,
        furnished,
        bedroom,
        bathroom,
        detail,
        formattedFrom,
        formattedTo,
        geo,
        uid,
        createdAt: Date.now(),
      });

      const docId = docRef.id;

      for (let index = 0; index < images.length; index++) {
        console.log(index);
        const image = images[index];
        try {
          const imageRef = ref(storage, docId + "/" + image.name);
          await uploadBytes(imageRef, image).then(() => {
            console.log("uploaded");
          });
          const imageLink =
            "https://storage.googleapis.com/" +
            imageRef.bucket +
            "/" +
            imageRef.fullPath;
          console.log(imageLink);
          await updateDoc(docRef, { imageLink });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.body}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="What is your address?"
          label="Address"
          required
          fullWidth
          className={styles.searchBar}
        />
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === "OK" && <ul>{renderSuggestions()}</ul>}

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="From"
            value={fromDate}
            onChange={(newValue) => {
              setFromDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="To"
            value={toDate}
            onChange={(newValue) => {
              setToDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <FormControl fullWidth sx={{ m: 1 }} className={styles.formcontrol}>
          <InputLabel
            htmlFor="outlined-adornment-amount"
            className={styles.searchAmount}
          >
            Amount
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />

          <FormControlLabel
            className={styles.checkbox}
            control={<Checkbox className={styles.form} />}
            label="Negotiable?"
            value={negotiable}
            onChange={(event) => {
              setNegotiable(event.target.checked);
            }}
          />
        </FormControl>
        <FormGroup className={styles.formcontrol}>
          <FormControlLabel
            className={styles.formcontrol}
            control={<Checkbox className={styles.form} />}
            label="Pet Allowed?"
            value={pet}
            onChange={(event) => {
              setPet(event.target.checked);
            }}
          />

          <FormControlLabel
            className={styles.formcontrol}
            control={<Checkbox className={styles.form} />}
            label="Furnished?"
            value={furnished}
            onChange={(event) => {
              setFurnished(event.target.checked);
            }}
          />
        </FormGroup>

        <FormGroup className={styles.numberofroom}>
          <FormControl sx={{ width: "25ch" }} className={styles.formcontrol}>
            <TextField
              id="outlined-number"
              label="Number of bedrooms"
              type="number"
              value={bedroom}
              onChange={(event) => {
                setBedroom(event.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ inputProps: { min: "0", max: "10", step: "1" } }}
            />
          </FormControl>

          <FormControl sx={{ width: "25ch" }} className={styles.formcontrol}>
            <TextField
              id="outlined-number"
              label="Number of bathrooms"
              type="number"
              value={bathroom}
              onChange={(event) => {
                setBathroom(event.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{ inputProps: { min: "0", max: "10", step: "1" } }}
            />
          </FormControl>
        </FormGroup>
        <FormControl sx={{ width: "100ch" }}>
          <TextField
            id="outlined-multiline-static"
            label="Other details"
            multiline
            value={detail}
            onChange={(event) => {
              setDetail(event.target.value);
            }}
            rows={4}
            placeholder="Please write other details you would like to let others know"
          />
        </FormControl>

        <input
          type="file"
          inputProps={{ accept: "image/*" }}
          onChange={(event) => setImages(event.target.files)}
          multiple
        />

        <Button variant="outlined" type="submit" className={styles.button}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddSublet;
