'use client';

import { GlobeIcon } from '@heroicons/react/solid';
import { City, Country } from 'country-state-city';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Select from 'react-select';

type Option = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null;

type CityOption = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    stateCode: string;
    name: string;
  };
  label: string;
} | null;

const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

function CityPicker() {
  const [selectedCountry, setSelectedCountry] = useState<Option>(null);
  const [selectedCity, setSelectedCity] = useState<CityOption>(null);

  const router = useRouter();

  const handleSelectedCountry = (Option: Option) => {
    setSelectedCountry(Option);
    setSelectedCity(null);
  };

  const handleSelectedCity = (Option: CityOption) => {
    setSelectedCity(Option);
    router.push(`/location/${Option?.value.latitude}/${Option?.value.longitude}`);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white/80">
          <GlobeIcon className="h-5 w-5 text-white" />
          <label htmlFor="country">Country</label>
        </div>

        <Select
          value={selectedCountry}
          onChange={handleSelectedCountry}
          options={options}
        />
      </div>

      {selectedCountry && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white/80">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="country">City</label>
          </div>

          <Select
            value={selectedCity}
            onChange={handleSelectedCity}
            options={City.getCitiesOfCountry(selectedCountry.value.isoCode)?.map((state) => ({
              value: {
                latitude: state.latitude!,
                longitude: state.longitude!,
                countryCode: state.countryCode,
                name: state.name,
                stateCode: state.stateCode,
              },
              label: state.name,
            }))}
          />
        </div>
      )}
    </div>
  );
}

export default CityPicker;
