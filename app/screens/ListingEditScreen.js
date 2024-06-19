import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import listingApi from "../api/listings";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  {
    backgroundColor: "#fd9644",
    icon: "bike",
    label: "Road Bikes",
    value: 1,
  },
  {
    backgroundColor: "#fc5c65",
    icon: "bike",
    label: "Mountain Bikes",
    value: 2,
  },
  {
    backgroundColor: "#26de81",
    icon: "bike",
    label: "Cruiser Bikes",
    value: 3,
  },
  {
    backgroundColor: "#fed330",
    icon: "bike",
    label: "Commuter Bikes",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "bike",
    label: "Touring Bikes",
    value: 5,
  },
  {
    backgroundColor: "#778ca3",
    icon: "bike",
    label: "Other",
    value: 9,
  },
];

function ListingEditScreen() {
  const [progress, setProgress] = useState(0);
  const [progressVisible, setProgressVisible] = useState(false);

  const location = useLocation();

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setProgressVisible(true);
    const result = await listingApi.addListing(
      { ...listing, location },
      (progress) => setProgress(progress)
    );
    
    if (!result.ok) {
      setProgressVisible(false);
      return alert("Couldn't save the listing.");
    }
    resetForm()
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        progress={progress}
        visible={progressVisible}
        onDone={() => setProgressVisible(false)}
      />
      <Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <Picker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
