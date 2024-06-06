import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput } from "react-native";

import { searchIcon } from "@/assets/icons";

interface SearchInputProps {
  initialValue: string;
}

const SearchInput = ({ initialValue }: SearchInputProps) => {
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState(initialValue);

  const onSearchValue = () => {
    if (pathname.startsWith("/search")) {
      return router.setParams({ query: searchValue });
    }
    
    return router.push(`/search/${searchValue}`);
  };

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-rs-regular"
        value={searchValue}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={setSearchValue}
      />

      <TouchableOpacity disabled={!searchValue} onPress={onSearchValue}>
        <Image source={searchIcon} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

SearchInput.defaultProps = {
  initialValue: "",
};

export default SearchInput;
