import * as React from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { IoPause } from "react-icons/io5/index.js";
import { IoPlay } from "react-icons/io5/index.js";
import { LiaTimesSolid } from "react-icons/lia/index.js";
import { FiSearch } from "react-icons/fi/index.js";
import { FaMicrophone } from "react-icons/fa/index.js";
import type { MetaFunction } from "@remix-run/node";
import {
  Avatar,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Center,
  Img,
  useBreakpointValue,
  Flex,
  Heading,
  Icon,
  Container,
  Button,
  useColorModeValue,
  Stack,
  Text,
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
  Divider,
  AccordionIcon,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "create" },
    { name: "description", content: "create voice!" },
  ];
};

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [a, setA] = React.useState(false);
  const [text, setText] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [b, setB] = React.useState<boolean>(true);
  const [openmodal, setopenmodal] = React.useState<boolean>(false);

  const navigate = useNavigate();
  let file: any;

  React.useEffect(() => {
    setTimeout(() => {
      if (typeof window !== "undefined") {
        setA(true);
      }
    }, 300);
  }, []);
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const handleSearch = (s: string) => {
    if (typeof window !== "undefined" && window !== null) {
      window.open(`https://www.digikala.com/search/?q=${s}`, "_blank").focus();
    }
  };

  const handleSendAudio = (blob: Blob) => {
    setLoading(true);
    let url = "https://asr.ussistant.ir/api/digikala/transcript";
    console.log("send");

    file = new File([blob], "name.webm", {
      type: "video/webm",
    });
    var fd = new FormData();
    fd.append("file", file);
    fd.append("query_id", text?.id ?? "");

    fetch("https://asr.ussistant.ir/api/digikala/transcript", {
      method: "POST",
      headers: {
        "X-API-Key": "akljnv13bvi2vfo0b0bw",
        // Accept: "application/json",
        // "Content-Type": "multipart/form-data",
        // "Content-Type":
        //   "multipart/form-data; charset=utf-8; boundary=" +
        //   Math.random().toString().substring(2),
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: fd,
    })
      .then((x) => x.json())
      .then((d) => {
        setText(d.message);
        // onClose();
        setLoading(false);
        // setB(false);
        setopenmodal(false);
        if (d.message.length > 1) {
          handleSearch(d.message);
        }

        // location.reload();
      })
      .catch((err) => {
        console.log(err), setLoading(false), location.reload();
      });
  };

  const handleStart = () => {
    setText("");
    setopenmodal(true);
    recorderControls.startRecording();
    // setB(true);
    // onOpen();
  };

  const handleFinish = async () => {
    recorderControls.stopRecording();
    //................. show loading

    //.................  API :: send file to get test
    //...............  cloze modal
    // onClose();
    //................   cloze loading
    // setLoading(false);
    // .............   update text value

    // ............  search in newTab
    // handleSearch();
  };

  const handleSubmit = (e: any) => {
    if (e == 13) {
      handleSearch(text ?? "");
    }
  };
  const handleClozee = () => {
    recorderControls.stopRecording();
    setopenmodal(false);
    console.log("cloze");

    // setB(false);
    // onClose();
  };
  return (
    <>
      <Box py={{ base: "10rem", md: "8rem" }} maxW="7xl" mx="auto">
        <Stack direction="row" spacing="12">
          <VStack w={"100%"}>
            <>
              <Container
                // border={"#ef4056 1px solid"}
                fontFamily={"yekan"}
                height={{ base: "40vh", md: "50vh" }}
                // float={"right"}
                // maxW="3000px"
                w={{ base: "90%", sm: "80%", md: "60%" }}
                py={{ base: "0", sm: "8" }}
                px={{ base: "1rem", sm: "10" }}
                bgColor={"white"}
                // bg={useBreakpointValue({ base: "white", sm: "white" })}
                // boxShadow={{
                //   base: "sm",
                //   sm: "md",
                // }}
                borderRadius={{ base: "lg", sm: "xl" }}
                position={"relative"}
              >
                <Box>
                  <Img
                    mx={"auto"}
                    style={{
                      // paddingLeft: "1rem",
                      width: "145px",
                      height: "122px",
                      marginBottom: "-0.5rem",
                      marginTop: "-0.5rem",
                    }}
                    src="https://cdn.worldvectorlogo.com/logos/digikala-3.svg"
                  />
                  <Box
                    color={"gray.600"}
                    fontFamily={"yekan"}
                    mt={"-2.2rem"}
                    mb={"1.2rem"}
                    textAlign={"center"}
                  >
                    سرچ صوتی دیجیکالا
                  </Box>
                </Box>
                <Stack spacing="8">
                  <HStack
                    borderRadius={"md"}
                    py={"1px"}
                    border={"1px solid #f0f0f1"}
                    float={"right"}
                    background={"white"}
                  >
                    <Box>
                      {a && (
                        <Button
                          _hover={{
                            bgColor: "gary.100",
                            // border: "1px solid #f0f0f1",
                          }}
                          bgColor={"transparent"}
                          // border={"1px solid #f0f0f1"}
                          boxShadow={"sm"}
                          p={"3"}
                          onClick={handleStart}
                        >
                          <Icon
                            // _hover={{
                            //   color: "black",
                            // }}
                            color={"gray.600"}
                            transform={"scale(1.2)"}
                            as={FaMicrophone}
                          />
                        </Button>
                      )}
                    </Box>
                    <Input
                      // color={"red"}
                      _placeholder={{
                        color: "gray.600",
                      }}
                      onKeyDown={(e) => handleSubmit(e.keyCode)}
                      onChange={(e) => setText(e.target.value)}
                      variant={"unstyled"}
                      value={text}
                      placeholder="جستجو کنید .."
                      type="text"
                      style={{
                        direction: "rtl",
                        outline: "none",
                        border: "none",
                      }}
                    />

                    <Box>
                      <Button
                        onClick={() => handleSearch(text ?? "")}
                        bgColor={"transparent"}
                        border={"none"}
                        boxShadow={"sm"}
                        p={"3"}
                        // onClick={handleStart}
                      >
                        <Icon
                          color={"gray.600"}
                          transform={"scale(1.2)"}
                          as={FiSearch}
                        />
                      </Button>
                    </Box>
                  </HStack>
                  <Box
                    pos={"absolute"}
                    transform={"scale(0.8)"}
                    ml={"-10px"}
                    mt={"48px"}
                    display={"flex"}
                    fontSize={"11px"}
                    letterSpacing={"2px"}
                    fontFamily={"sans-serif"}
                    color={"gray.600"}
                  >
                    POWERED BY{" "}
                    <img
                      style={{
                        paddingLeft: "5px",
                        width: "90px",
                        height: "90px",
                        marginTop: "-2.4rem",
                      }}
                      src="/ussis.png"
                    />
                  </Box>
                </Stack>
              </Container>
            </>

            {/* text box */}
          </VStack>
        </Stack>
      </Box>
      <Box
        display={openmodal ? "flex" : "none"}
        justifyContent={"center"}
        alignItems={"center"}
        top={0}
        left={0}
        width={"100%"}
        height={"100%"}
        position={"fixed"}
      >
        <Box
          onClick={handleClozee}
          width={"100%"}
          height={"100%"}
          bgColor={"rgba(0, 0, 0, 0.48)"}
        ></Box>

        <Box
          borderRadius={"md"}
          px={"2rem"}
          py={"2rem"}
          fontFamily={"yekan"}
          zIndex={"22"}
          pos={"absolute"}
          width={{ base: "90vw", sm: "60vw", md: "40vw", lg: "30vw" }}
          bgColor={"white"}
          mb={{ base: "12rem", md: "13rem" }}
        >
          <Button
            pos={"absolute"}
            top={"6px"}
            right={"1rem"}
            bgColor={"transparent"}
            // boxShadow={"sl"}
            p={"3"}
            onClick={handleClozee}
          >
            <Icon
              color={"gray.600"}
              transform={"scale(1.4)"}
              as={LiaTimesSolid}
            />
          </Button>
          <HStack
            py={"4rem"}
            // mt={"1rem"}
            justifyContent={loading ? "center" : "space-between"}
            width={"100%"}
          >
            <>
              {" "}
              <Box
                transform={{ base: "scale(1.5)", md: "scale(1.5)" }}
                filter={"grayscale(1.4)"}
                width={"31px"}
                overflowX={"hidden"}
                borderRadius={"26px"}
                // border={"1px gray solid"}
                shadow={"sm"}
              >
                <Box style={{ transform: "translateX(-8px)" }}>
                  <AudioRecorder
                    classes={{
                      AudioRecorderPauseResumeClass: "arash",
                      AudioRecorderDiscardClass: "arash",
                      AudioRecorderStartSaveClass: "arash",
                      AudioRecorderTimerClass: "arash",
                    }}
                    recorderControls={recorderControls}
                    downloadFileExtension="mp3"
                    showVisualizer={true}
                    onRecordingComplete={handleSendAudio}
                  />
                </Box>
              </Box>
              {!loading && (
                <Box transition={"opacity 2s ease"} fontSize={"1.5rem"}>
                  {" "}
                  ... در حال گوش دادن{" "}
                </Box>
              )}
            </>
            {loading && (
              <>
                <Box fontSize={"1.5rem"} mr={"15px"}>
                  {" "}
                  ... در حال انجام پروسه{" "}
                </Box>{" "}
                <Spinner color="red.500" />
              </>
            )}
          </HStack>
          {!loading && (
            <>
              <Button
                width={"100%"}
                mx={"auto"}
                colorScheme="red"
                mr={3}
                onClick={handleFinish}
              >
                پایان ضبط
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
