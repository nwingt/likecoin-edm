import * as React from 'react';
import { MjmlColumn, MjmlTable, MjmlText } from 'mjml-react';
import { FormattedMessage } from 'react-intl';

import { LIKER_LAND_ROOT } from '../../../../constants';
import * as Colors from '../../../../constants/colors';

import { getPriceEmojiURL } from '../../../../utils/civic';
import { getLocalizedOrdinalDay } from '../../../../utils/localization';
import { wrapUtm } from '../../../../utils/url';

import { Avatar } from '../../../../components/avatar';
import { LikeCoinButtonCTA } from '../../../../components/cta-likecoin-button';
import { FooterSection } from '../../../../components/footer';
import { HeaderSection } from '../../../../components/header';
import { Link } from '../../../../components/link';
import { BasicSection } from '../../../../components/sections/basic';
import { MonthlyReportHeaderSection } from '../../../../components/sections/monthly-report-header';
import { TableRow } from '../../../../components/table-row';
import { TemplateBase } from '../../../../components/template-base';
import { TwoNumbersSection } from '../../../../components/sections/two-numbers';

import { MonthlyReportCivicLikerV2TemplateProps } from './v2.types';

export const MonthlyReportCivicLikerV2Template = (
  props: MonthlyReportCivicLikerV2TemplateProps
) => {
  const {
    language,
    avatarSrc,
    isCivicLiker = false,
    timestamp = 0,
    totalSupportedCreatorsBySubscription = 0,
    totalSupportedCreatorsByFund = 0,
    billingDateTimestamp,
    subscribingCreators = [],
    supportedContents = [],
  } = props;
  return (
    <TemplateBase language={language}>
      <HeaderSection />

      <MonthlyReportHeaderSection
        avatarSrc={avatarSrc}
        isCivicLiker={isCivicLiker}
        title={<FormattedMessage id="report.monthly.civic-liker.title" />}
        timestamp={timestamp}
      />

      <TwoNumbersSection
        title={
          <FormattedMessage id="report.monthly.civic-liker.supported.v2" />
        }
        value1={totalSupportedCreatorsBySubscription}
        label1={
          <FormattedMessage id="report.monthly.civic-liker.supported.creators.subscription" />
        }
        value2={totalSupportedCreatorsByFund}
        label2={
          <FormattedMessage id="report.monthly.civic-liker.supported.creators.fund" />
        }
      />

      <BasicSection>
        <MjmlColumn>
          <MjmlText paddingBottom={16} fontSize={16} fontWeight={600}>
            <FormattedMessage id="report.monthly.civic-liker.subscribers.title" />
          </MjmlText>
          <MjmlText paddingBottom={16} fontSize={16}>
            <FormattedMessage
              id="report.monthly.civic-liker.subscribers.description"
              values={{
                a: (text: string) => (
                  <Link href={wrapUtm(`${LIKER_LAND_ROOT}/settings/civic`)}>
                    {text}
                  </Link>
                ),
                day: getLocalizedOrdinalDay(language, billingDateTimestamp),
              }}
            />
          </MjmlText>
          <MjmlTable cellpadding="8px">
            {subscribingCreators.map((creator, i) => (
              <TableRow key={i} isFirstChild={i === 0}>
                <td width={48}>
                  <Avatar
                    src={creator.avatarSrc}
                    likerID={creator.likerID}
                    displayName={creator.displayName}
                    isCivicLiker={creator.isCivicLiker}
                    size={48}
                  />
                </td>
                <td>
                  <Link
                    href={`${LIKER_LAND_ROOT}/${creator.likerID}`}
                    style={{ textDecoration: 'none', color: Colors.Grey4A }}
                  >
                    {creator.displayName}
                  </Link>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <img
                    alt={`USD ${creator.amount}/mo`}
                    src={getPriceEmojiURL(creator.amount)}
                    style={{
                      height: 18,
                      verticalAlign: 'middle',
                      marginRight: 8,
                    }}
                  />
                  USD {creator.amount}/mo
                </td>
              </TableRow>
            ))}
          </MjmlTable>
        </MjmlColumn>
      </BasicSection>

      <LikeCoinButtonCTA />

      <BasicSection>
        <MjmlColumn>
          <MjmlText paddingBottom={16} fontSize={16} fontWeight={600}>
            <FormattedMessage id="report.monthly.civic-liker.supported.contents.title" />
          </MjmlText>
          <MjmlText paddingBottom={16} fontSize={16}>
            <FormattedMessage
              id="report.monthly.civic-liker.supported.contents.description"
              values={{
                a: (text: string) => (
                  <Link href={wrapUtm(`${LIKER_LAND_ROOT}/getapp`)}>
                    {text}
                  </Link>
                ),
              }}
            />
          </MjmlText>
          <MjmlTable cellpadding="8px">
            {supportedContents.map((content, i) => (
              <TableRow key={i} isFirstChild={i === 0}>
                <td style={{ width: 64 }}>
                  <Link href={content.url}>
                    <img
                      src={content.imageSrc}
                      alt={content.title}
                      style={{
                        display: 'block',
                        width: 64,
                        height: 64,
                        objectFit: 'cover',
                      }}
                    />
                  </Link>
                </td>
                <td style={{ paddingLeft: 16, paddingRight: 16 }}>
                  <Link
                    href={content.url}
                    style={{ color: Colors.Grey4A, textDecoration: 'none' }}
                  >
                    {content.title}
                  </Link>
                </td>
                <td style={{ width: 48 }}>
                  <Avatar
                    src={content.avatarSrc}
                    likerID={content.likerID}
                    displayName={content.displayName}
                    isCivicLiker={content.isCivicLiker}
                    size={48}
                  />
                </td>
                <td style={{ maxWidth: 100 }}>
                  <Link
                    href={`${LIKER_LAND_ROOT}/${content.likerID}`}
                    style={{ textDecoration: 'none', color: Colors.Grey4A }}
                  >
                    {content.displayName}
                  </Link>
                </td>
              </TableRow>
            ))}
          </MjmlTable>
        </MjmlColumn>
      </BasicSection>

      <FooterSection />
    </TemplateBase>
  );
};
