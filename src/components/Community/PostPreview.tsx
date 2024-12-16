import { Post_T } from "../../type/Post";

type Props = {
  preview: Post_T;
};

export default function PostPreview({ preview }: Props) {
  const sampleImgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrgVj6z0tfzZSheYRKDWVUhB5zIkiZ9vUo6rFSULPgctqkQSmlkwfCDZ1RMHxgFF2XKIlAJb_28QzyZaR5s6zfQ";

  return (
    <article className="bg-white shadow-md">
      {/* 썸네일 이미지 */}
      <div className="relative aspect-video">
        <img
          src={sampleImgUrl}
          alt={preview.title}
          className="object-cover w-full h-full"
        />
      </div>
      {/* 글 제목 및 내용 미리보기 */}
      <div className="">
        <h4 className="truncate mb-1 font-bold text-2xl">{preview.title}</h4>
        <div>
          <p className="line-clamp-3 mb-3	text-sm text-slate-600	">
            안녕하세요!💌 오늘은 12 Days of OpenAI: Day 3에서는 새로운 AI 비디오
            생성 플랫폼인 Sora를 소개합니다!!!! 한국도 접속 가능합니다!! 하지만,
            지금 폭주 중이라, SignUp은 좀 기다려야 할수도 ㅠㅠㅠㅠ 아 써보고
            싶은데...!!!
          </p>
        </div>
        <div className="text-xs text-slate-500">
          <span>{preview.createdAt}</span>
          <span>·</span>
          <span>{preview.comments.length}개의 댓글</span>
        </div>
      </div>
      {/* 작성자 및 추천 수 */}
      <div>
        {/* <img src={preview.profileImg} alt="글쓴이 프로필 이미지" /> */}
        <span>{preview.author.fullName}</span>
        {/* 하트 이미지 넣기 */}
        <div>{preview.likes.length}</div>
      </div>
    </article>
  );
}

// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Avatar from '@mui/material/Avatar';
// import IconButton, { IconButtonProps } from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// export default function PostPreview() {

//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardHeader
//         avatar={
//           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//             R
//           </Avatar>
//         }
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title="Shrimp and Chorizo Paella"
//         subheader="September 14, 2016"
//       />
//       <CardMedia
//         component="img"
//         height="194"
//         image="/static/images/cards/paella.jpg"
//         alt="Paella dish"
//       />
//       <CardContent>
//         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//           This impressive paella is a perfect party dish and a fun meal to cook
//           together with your guests. Add 1 cup of frozen peas along with the mussels,
//           if you like.
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon />
//         </IconButton>
//       </CardActions>
//     </Card>
//   );
// }
