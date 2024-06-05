import { Tabs } from 'expo-router';
import { TabIcon } from '@/components';
import { homeIcon, addIcon, personIcon, bookmarkIcon } from '@/assets/icons';

const tabsConfig = [
  {
    url: 'home',
    name: 'Home',
    iconUri: homeIcon,
  },
  {
    url: 'bookmark',
    name: 'Bookmark',
    iconUri: bookmarkIcon,
  },
  {
    url: 'create',
    name: 'Create',
    iconUri: addIcon,
  },
  {
    url: 'profile',
    name: 'Profile',
    iconUri: personIcon,
  },
];

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 84,
        },
      }}
    >
      {tabsConfig.map(({ name, url, iconUri }) => (
        <Tabs.Screen
          name={url}
          options={{
            title: name,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon name={name} iconUri={iconUri} color={color} focused={focused} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
