import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { Column } from 'app/shared/components/column';
import { Row } from 'app/shared/components/row';
import { Text } from 'app/shared/components/text';

import { getAuthors } from 'app/shared/services/authors';

interface Author {
  _uid: string;
  image: string;
  name: string;
}

export function AppModule() {
  const [authors, setAuthors] = useState<Author[]>();
  const [isGettingAuthors, setIsGettingAuthors] = useState<boolean>(true);

  useEffect(() => {
    async function fetch() {
      setIsGettingAuthors(true);
      try {
        const {
          data: { stories },
        } = await getAuthors();

        setAuthors(
          (stories as Array<{ content: Author }>).map(it => {
            return {
              ...it.content,
              image: `https:${it.content.image}`,
            };
          }),
        );
      } finally {
        setIsGettingAuthors(false);
      }
    }

    fetch();
  }, []);

  return (
    <Column flex={1} as={SafeAreaView} bg="white">
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      {isGettingAuthors ? (
        <Column flex={1} alignItems="center" justifyContent="center">
          <ActivityIndicator size="small" color="light-blue" />
        </Column>
      ) : (
        <ScrollView>
          {authors?.map(it => (
            <Row
              as={TouchableOpacity}
              key={it._uid}
              p="16px"
              alignItems="center">
              <Image
                source={{ uri: it.image }}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ width: 48, height: 48 }}
              />

              <Text ml="16px" fontSize="16px" letterSpacing="0.6px">
                {it.name}
              </Text>
            </Row>
          ))}
        </ScrollView>
      )}
    </Column>
  );
}
