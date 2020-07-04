import * as React from "react";
import {
  Box,
  Button,
  Checkbox,
  Element,
  Form,
  Image,
  Line,
  List,
  ListBar,
  ListTable,
  Log,
  Loading,
  ProgressBar,
  Prompt,
  Question,
  RadioButton,
  RadioSet,
  Table,
  Text,
  Textarea,
  Textbox,
} from "../../src/components/primitives";
import { Grid } from "../../src/components/Grid";
import { button as buttonStyle, demoBorderStyles } from "../utils/styles";
import { Widgets } from "neo-blessed";
import { useInterval } from "../utils/hooks/useInterval";
import { sync as pkgUp } from "pkg-up";
import { dirname } from "path";
import { ComponentShowcase, Example } from "./ComponentShowcase";

const projectDirname = dirname(pkgUp()!);

const examples: Example[] = [
  {
    label: "box",
    component: (
      <Box
        label="Demo Box Label"
        children="dummy-box"
        {...demoBorderStyles()}
      />
    ),
  },
  {
    label: "button",
    component: (
      <Button
        top={3}
        left={3}
        width={20}
        height={3}
        children="I am a button"
        style={buttonStyle}
      />
    ),
  },
  {
    label: "checkbox",
    component: (
      <>
        <Checkbox mouse checked left={0} />
        <Text left={4}>I'm a checkbox</Text>
      </>
    ),
  },
  // 🤔 not sure filemanager works
  // <FileManager top={3} left={3} height="100%-2" width="100%-2" label="file-manager-demo" {...demoBorderStyles()} />,
  {
    label: "form",
    component: (function createFormDemo() {
      function FormDemo() {
        const form = React.useRef(({} as unknown) as Widgets.FormElement<any>);
        const [submission, setSubmission] = React.useState<any>({ text: "" });
        return (
          <Form
            {...{
              ref: form,
              height: "100%-2",
              width: "100%-2",
              label: "form-demo",
              style: { bg: "cyan", border: { fg: "blue" } },
              onsubmit: (data: any) => {
                setSubmission(data);
              },
              mouse: true,
              keys: true,
              ...demoBorderStyles(),
            }}
          >
            <Text top={1}>Comments:</Text>
            <Textarea
              onsubmit={(node) => {
                setSubmission({ ...submission });
              }}
              {...demoBorderStyles()}
              left={10}
              width={30}
              top={0}
              height={3}
              keys
              mouse
              inputOnFocus
            />
            <Text top={6}>Name:</Text>
            <Textbox
              censor
              onsubmit={(node) => {
                setSubmission({ ...submission });
              }}
              {...demoBorderStyles()}
              left={10}
              width={30}
              top={5}
              height={3}
              keys
              mouse
              inputOnFocus
            />
            <Button
              top={8}
              left={0}
              width={30}
              height={3}
              children="Mandatory submit button"
              keys
              mouse
              style={buttonStyle}
              onclick={() => {
                form.current?.submit();
              }}
            />
          </Form>
          // {submission && JSON.stringify(submission)}
        );
      }
      return <FormDemo />;
    })(),
  },
  {
    label: "image",
    component: (
      <Image
        file={require("path").resolve(projectDirname, "img/megaman.png")}
        scrollable
        width={30}
        type="ansi"
      />
    ),
  },
  {
    label: "<Line />",
    component: (
      <Box>
        <Line left={1} />
        <Line left={3} ch="#" />
        <Line left={5} ch="^" bg="blue" type="bg" />
        {[...Array(10)].map((_, i) => (
          <Line
            key={i}
            left={7}
            top={2 * i + 1}
            width={20}
            ch="%"
            type="bg"
            orientation="horizontal"
          />
        ))}
      </Box>
    ),
  },
  {
    label: "<List />",
    component: (
      <List
        items={[...Array(10)].map((_, i) => `${i}. square: ${Math.pow(i, 2)}`)}
        style={{
          selected: {
            fg: "white",
            bold: true,
            bg: "red",
            underline: true,
          },
        }}
        scrollable
        mouse
        keys
      />
    ),
  },
  {
    label: "<ListBar />",
    component: (
      <ListBar
        autoCommandKeys
        items={{ option1: () => {}, option2: () => {} }}
        style={{
          selected: {
            fg: "white",
            bold: true,
            bg: "red",
            underline: true,
          },
        }}
        keys
      />
    ),
  },
  {
    label: "<ListTable />",
    component: (
      <ListTable
        left={2}
        top={1}
        style={{
          header: {
            bg: "white",
            fg: "black",
          },
        }}
        data={[
          ["cat", "dog"],
          ["---", "---"],
          ["felix", "pluto"],
          ["salem", "lassie"],
        ]}
      />
    ),
  },
  {
    label: "<Log />",
    component: (function createLogDemo() {
      const LogDemo: React.FC = () => {
        const ref = React.useRef<Widgets.Log>({} as any);
        React.useEffect(() => {
          ref.current?.add(`Getcher logs! Step right up!`);
          const interval = setInterval(() => {
            ref.current?.add(`log entry: ${new Date().toISOString()}`);
          }, 1000);
          return () => clearInterval(interval);
        });
        return (
          <Log
            ref={ref}
            {...demoBorderStyles()}
            scrollback={15}
            height={10}
            width={50}
            keys
            mouse
            draggable
          />
        );
      };
      return <LogDemo />;
    })(),
  },
  {
    label: "<Loading />",
    component: (function createLoadingDemo() {
      const LoadingDemo: React.FC = () => {
        const [isLoading, setIsLoading] = React.useState(true);
        React.useEffect(() => {
          const timeout = setInterval(() => {
            setIsLoading(!isLoading);
          }, 4000);
          return () => clearInterval(timeout);
        }, [isLoading]);
        return (
          <Loading
            message="...Loading...  @warning: This component captures keys and blocks user interaction. It will toggle off in a moment :/"
            isLoading={isLoading}
          />
        );
      };
      return <LoadingDemo />;
    })(),
  },
  // @warning not recommended for usage in react, hence not demoed
  // ["<Message />", <Message />],
  {
    label: "<ProgressBar />",
    component: (function createProgressDemo() {
      const ProgressDemo: React.FC = () => {
        const [filled, setFilled] = React.useState(0);
        useInterval(() => {
          setFilled((last) => (last === 100 ? 0 : last + 2));
        }, 100);
        return (
          <ProgressBar
            orientation="horizontal"
            filled={filled}
            top="30%"
            left="center"
            height="15%"
            width="70%"
            label="Radness Achievement %"
            border={{ type: "line" }}
            style={{ border: { fg: "red" }, bar: { bg: "red" } }}
          />
        );
      };
      return <ProgressDemo />;
    })(),
  },
  {
    label: "<Prompt />",
    component: (function createPromptDemo() {
      const PromptDemo: React.FC<{}> = () => {
        const [answer, setAnswer] = React.useState("");
        if (answer) return <Text>{answer}</Text>;
        return (
          <Prompt
            label="Prompt!"
            {...demoBorderStyles()}
            keys
            text="You sure you want to go forward? [Yes|No] (@warning--blessed does not handle mouse events properly here. Recommended to _not_ use this component.)"
            defaultValue="Yes"
            onResponse={(res) => {
              setAnswer(`You responded with: ${res}`);
            }}
          />
        );
      };
      return <PromptDemo />;
    })(),
  },
  {
    label: "<Question />",
    component: (function createQuestionDemo() {
      const QuestionDemo: React.FC<{}> = () => {
        const [answer, setAnswer] = React.useState("");
        if (answer) return <Text>{answer}</Text>;
        return (
          <Question
            label="Let me ask you a question, please."
            {...demoBorderStyles()}
            keys
            text="How are you ready to proceed?"
            onResponse={(res) => setAnswer(`You responded with: ${res}`)}
          />
        );
      };
      return <QuestionDemo />;
    })(),
  },
  {
    label: "<RadioButton />",
    component: (function createRadioDemo() {
      const defaultRadioProps = {
        mouse: true,
        keys: true,
        hoverText: "im a radio button",
      };
      return (
        <Form>
          <RadioButton top={1} {...defaultRadioProps} />
          <Text top={1} left={4}>
            Option 1
          </Text>
          <RadioButton top={2} {...defaultRadioProps} />
          <Text top={2} left={4}>
            Option 2
          </Text>
        </Form>
      );
    })(),
  },
  {
    label: "<RadioSet />",
    component: (function createRadioSetDemo() {
      const defaultRadioProps = {
        mouse: true,
        keys: true,
        hoverText: "im a radio button",
      };
      return (
        <Form label="Business Critical Radio Form" {...demoBorderStyles()}>
          <Grid
            cols={1}
            rows={2}
            items={[
              {
                row: 0,
                col: 0,
                render: (props) => (
                  <Element
                    border={{ type: "line" }}
                    style={{ border: { fg: "blue" } }}
                    {...props}
                  >
                    <RadioSet>
                      <RadioButton {...defaultRadioProps} />
                      <Text left={4}>Option 1 - Group 1</Text>
                      <RadioButton top={1} {...defaultRadioProps} />
                      <Text top={1} left={4}>
                        Option 2 - Group 1
                      </Text>
                    </RadioSet>
                  </Element>
                ),
              },
              {
                row: 1,
                col: 0,
                render: (props) => (
                  <Element
                    border={{ type: "line" }}
                    style={{ border: { fg: "blue" } }}
                    {...props}
                  >
                    <RadioSet>
                      <RadioButton {...defaultRadioProps} />
                      <Text left={4}>Option 1 - Group 2</Text>
                      <RadioButton top={1} {...defaultRadioProps} />
                      <Text top={1} left={4}>
                        Option 2 - Group 2
                      </Text>
                    </RadioSet>
                  </Element>
                ),
              },
            ]}
          />
        </Form>
      );
    })(),
  },
  // ["<ScrollableBox />", <ScrollableBox   {...demoBorderStyles()}
  // height={10}
  // width={50}
  // scrollbar={{
  //   track: {
  //     bg: 'red',
  //   },
  //   ch: '#'
  // }}
  // // items={[...Array(50)].map((_, i) => `scroll me - ${i}`)}
  // draggable /> ],
  // ["<ScrollableText />", <ScrollableText />],
  {
    label: "<Table />",
    component: (
      <Table
        left={2}
        top={1}
        pad={1}
        style={{
          header: {
            bg: "white",
            fg: "black",
          },
        }}
        data={[
          ["cat", "dog"],
          ["---", "---"],
          ["felix", "pluto"],
          ["salem", "lassie"],
        ]}
      />
    ),
  },
  {
    label: "<Text />",
    component: (
      <Text left={2} top={1} height={5} align={"center"}>
        This is a Text node! Generally you don't need to use this explicity. The
        blessed react-reconciler will convert HTML/JSX/XML-like plain-text nodes
        and convert them for you. Plain text is always painted via
        blessed.text(...) nodes! Blessed has a text escape syntax that will be
        processed here. Be mindful that what you think is plaintext may actually
        get post-processing by blessed. See
        https://github.com/chjj/blessed#escaping for more!
      </Text>
    ),
  },
  {
    label: "<Textbox />",
    component: (
      <Textbox
        label="Textbox - censoring secrets!"
        censor
        {...demoBorderStyles()}
        left={10}
        width={80}
        top={5}
        height={3}
        keys
        mouse
        inputOnFocus
      />
    ),
  },
  // ["<Terminal />", <Terminal />],
].map(({ label, component }, i) => ({
  label,
  component: <Element key={i}>{component}</Element>,
}));

export const PrimitiveShowcase = () => (
  <ComponentShowcase examples={examples} />
);
